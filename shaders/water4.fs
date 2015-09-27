#line 2
// Found this on GLSL sandbox. I really liked it, changed a few things and made it tileable.
// :)
// by David Hoskins.

// Water turbulence effect by joltz0r 2013-07-04, improved 2013-07-07
// Redefine below to see the tiling...
//#define SHOW_TILING

// by summer4me…
// I have found the script here https://www.shadertoy.com/view/MdlXz8
// and have adapted it for procedural entities in Highfidelity 


#define TAU 6.28318530718
#define MAX_ITER 5

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{	vec2 iResolution;
	iResolution.x=2.0;
	iResolution.y=2.0;
    float time = iGlobalTime * .5+23.0;
    // uv should be the 0-1 uv of texture...
    vec2 uv = fragCoord.xy / iResolution.xy;
    
#ifdef SHOW_TILING
    vec2 p = mod(uv*TAU*2.0, TAU)-250.0;
#else
    vec2 p = mod(uv*TAU, TAU)-250.0;
#endif
    vec2 i = vec2(p);
    float c = 1.0;
    float inten = .005;
    
    for (int n = 0; n < MAX_ITER; n++)
    {
        float t = time * (1.0 - (3.5 / float(n+1)));
        i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
        c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));
    }
    c /= float(MAX_ITER);
    c = 1.17-pow(c, 1.4);
    vec3 colour = vec3(pow(abs(c), 8.0));
    colour = clamp(colour + vec3(0.0, 0.35, 0.5), 0.0, 1.0);
    
    
#ifdef SHOW_TILING
    // Flash tile borders...
    vec2 pixel = 2.0/ iResolution.xy;
    uv *= 2.0;
    
    float f = floor(mod(iGlobalTime*.5, 2.0)); 	// Flash value.
    vec2 first = step(pixel, uv) * f;		   	// Rule out first screen pixels and flash.
    uv  = step(fract(uv), pixel);				// Add one line of pixels per tile.
    colour = mix(colour, vec3(1.0, 1.0, 0.0), (uv.x + uv.y) * first.x * first.y); // Yellow line
    
#endif
    fragColor = vec4(colour, 1.0);
}


// This is the function that is being called by us
	vec4 getProceduralColor() {
    // retrieve the position to get the color
    vec2 position = _position.xz;
    // add a half to all the axes to adjust them to our method
    position += 0.5;
    // invert the y axis
    position.y = 1.0 - position.y;
    // initialize the result value
    vec4 result;
    // We call shadertoy their entry point here, which is mainImage for normal viewports
    // This function writes to the result value, as input we enter the position multiplied by the current worldscale
    mainImage(result, position * iWorldScale.xz);
    // Return the colour vector to our renderer in Interface
    return result;
}
