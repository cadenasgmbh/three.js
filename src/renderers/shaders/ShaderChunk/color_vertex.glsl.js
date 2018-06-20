export default `
#ifdef USE_COLOR

	vColor.xyz = colorToLinear(vec4(color.xyz, 1.0)).xyz;

#endif
`;
