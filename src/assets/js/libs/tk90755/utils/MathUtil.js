class MathUtil {
  constructor(){
    
  }
  
  rgbToHex(rgb){
    return "#" + rgb.map( function ( value ) {
      return ( "0" + value.toString( 16 ) ).slice( -2 );
    } ).join( "" );
  };
  
  hexToRgb(hex){
    if(hex.substr(0,1) === '#')hex = hex.substr(1,6);
    if(hex.length !== 6){
      console.log('hex should be length 6.')
      return {r:0,g:0,b:0};
    }
    return {
      r:parseInt(hex.substr(0,2),16),
      g:parseInt(hex.substr(2,2),16),
      b:parseInt(hex.substr(4,2),16)
    };
	};
}

export default new MathUtil();
