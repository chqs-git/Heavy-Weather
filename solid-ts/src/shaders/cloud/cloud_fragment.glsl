highp float;
precision highp sampler3D;

// Samplers
varying vec2 vUV;
uniform sampler2D textureSampler;

// Parameters
uniform float time;
uniform vec2 Dimensions;
uniform vec3 BoundsMin;
uniform vec3 BoundsMax;
uniform vec3 CamPos;
uniform vec3 BoxPos;

// Cloud
uniform float numSteps;
uniform float overlayStrength;
uniform float CloudScale;
uniform float DensityMultiplier;

// Textures
uniform sampler3D CloudTex;
uniform sampler2D BlueTex;

//Light
uniform vec3 lightCol;
uniform vec3 lightDir;
uniform vec3 shadowCol;
uniform float lightAbsorptionThroughCloud;
uniform float darknessThreshold;
uniform float powderStrength;

#define CAM_FOV_FACTOR 1.2
#define offsetStrength 0.05
#define lightAbsorptionTowardSun .01
#define numStepsLight 12.
#define phaseX .5
#define phaseY .5
#define phaseZ .6
#define phaseW .25

// Henyey-Greenstein
float hg(float a, float g) {
    float g2 = g*g;
    return (1.-g2) / (4.*3.1415*pow(1.+g2-2.*g*(a), 1.5));
}

float phase(float a, float z) {
    float blend = .5;
    float hgBlend = hg(a, phaseX) * (1.-blend) + hg(a, -phaseY) * blend;
    return z + hgBlend*phaseW;
}

//  Powder effect function
float powder(float d) {
    return 1. - exp(-d * 2.);
}

vec3 getRayDir(vec3 camPos, vec3 viewDir, vec2 pixelPos, float ratio) {
    vec3 camRight = normalize(cross(viewDir, vec3(0.0, 1.0, 0.0)));
    vec3 camUp = normalize(cross(camRight, viewDir));
    return normalize((pixelPos.x - .5) * ratio *(camRight*-1.) + (pixelPos.y - .5)*camUp + CAM_FOV_FACTOR*viewDir);
}

vec3 rayBoxDst(vec3 boundsMin, vec3 boundsMax, vec3 rayOrigin, vec3 rayDir) {
    vec3 t0 = (boundsMin - rayOrigin) / rayDir;
    vec3 t1 = (boundsMax - rayOrigin) / rayDir;

    vec3 tMin = min(t0, t1);
    vec3 tMax = max(t0, t1);

    float dstA = max(max(tMin.x, tMin.y), tMin.z);
    float dstB = min(tMax.x, min(tMax.y, tMax.z));

    float dstToBox = max(0., dstA);
    float dstInsideBox = max(0., dstB - dstToBox);

    return vec3(dstToBox, dstInsideBox, dstA > dstB);
}

vec2 squareUV(vec2 uv) {
    float width = Dimensions.x;
    float height = Dimensions.y;
    float scale = 1000.;
    float x = uv.x * width;
    float y = uv.y * height;
    return vec2 (x/scale, y/scale);
}

float sampleDensity(vec3 pos) {
    vec3 samplePos = pos + vec3(.5, .5, .5) * CloudScale;

    // Primary Shape
    vec4 shape = texture(CloudTex, samplePos);

    return shape.x * 10. * DensityMultiplier;;
}

float lightMarch(vec3 pos) {
    vec3 dirToLight = lightDir * -1.;
    float dstInsideBox = rayBoxDst(BoundsMin, BoundsMax, pos, dirToLight).y;

    float stepSize = dstInsideBox / numStepsLight;
    float totalDensity = 0.;

    vec3 nPos = pos;

    nPos += dirToLight * stepSize;
    totalDensity += sampleDensity(nPos) * stepSize;

    nPos += dirToLight * stepSize;
    totalDensity += sampleDensity(nPos) * stepSize;

    nPos += dirToLight * stepSize;
    totalDensity += sampleDensity(nPos) * stepSize;

    nPos += dirToLight * stepSize;
    totalDensity += sampleDensity(nPos) * stepSize;

    nPos += dirToLight * stepSize;
    totalDensity += sampleDensity(nPos) * stepSize;

    nPos += dirToLight * stepSize;
    totalDensity += sampleDensity(nPos) * stepSize;

    nPos += dirToLight * stepSize;
    totalDensity += sampleDensity(nPos) * stepSize;

    nPos += dirToLight * stepSize;
    totalDensity += sampleDensity(nPos) * stepSize;

    nPos += dirToLight * stepSize;
    totalDensity += sampleDensity(nPos) * stepSize;

    nPos += dirToLight * stepSize;
    totalDensity += sampleDensity(nPos) * stepSize;

    nPos += dirToLight * stepSize;
    totalDensity += sampleDensity(nPos) * stepSize;

    nPos += dirToLight * stepSize;
    totalDensity += sampleDensity(nPos) * stepSize;

    float transmittance = exp(totalDensity * lightAbsorptionTowardSun);
    return darknessThreshold + transmittance * (1. - darknessThreshold);
}

void main(void) {
    float ratio = Dimensions.x / Dimensions.y;
    vec3 camDir = getRayDir(CamPos, normalize(BoxPos - CamPos), vUV, ratio);
    vec3 rayInfo = rayBoxDst(BoundsMin, BoundsMax, CamPos, camDir);
    float dstToBox = rayInfo.x;
    float dstInsideBox = rayInfo.y;
    float missBox = rayInfo.z;

    float cosAngle = dot(camDir, lightDir * -1.);
    float phaseVal = phase(cosAngle, phaseZ);
    float phaseSVal = phase(cosAngle, overlayStrength);

    // random starting offset (makes low-res results noisy rather than jagged/glitchy, which is nicer)
    float randomOffset = texture(BlueTex, squareUV(vUV * 3.)).x * offsetStrength;

    float dstTravelled = randomOffset;
    float stepSize = dstInsideBox / numSteps;
    float dstLimit = max(0., dstInsideBox);

    // point of intersection with the cloud container
    vec3 entryPoint = CamPos + camDir * dstToBox;
    
    // March through volume
    float transmittance = 1.;
    float lightEnergy = 0.;
    float shadowEnergy = 0.;
    
    if (missBox != 1.) { // cloud container hit !
        while (dstTravelled < dstLimit) {
            vec3 rayPos = entryPoint + camDir * dstTravelled;
            float density = sampleDensity(rayPos);

            if (density > 0.) {
                float lightTransmittance = lightMarch(rayPos);
                float powderVal = powder(density * powderStrength);
                float densityStep = density * stepSize;

                float transmittanceVal = densityStep * transmittance;
                float lightData = lightTransmittance * powderVal;

                lightEnergy  += transmittanceVal * lightData * phaseVal;
                shadowEnergy += transmittanceVal * (1. - lightData * phaseSVal);

                transmittance *= exp(- densityStep * lightAbsorptionThroughCloud);

                if (transmittance < 0.01) { break; }
            }
            dstTravelled += stepSize;
        }
    }
    
    vec3 backgroundCol = texture(textureSampler, vUV).xyz;
    vec3 cloudCol = lightCol *lightEnergy + shadowCol * shadowEnergy;
    vec3 color = backgroundCol * transmittance + cloudCol;

    gl_FragColor = vec4(color, 1.);
}