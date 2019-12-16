var blends = ["addition","addition128","and","average","burn","darken","difference","difference128","divide","dodge","freeze","exclusion","glow","hardlight","hardmix","heat","lighten","linearlight","multiply","multiply128","negation","normal","or","overlay","phoenix","pinlight","reflect","screen","softlight","subtract","vividlight","xor"]

const exec = require('child_process').exec;

function doBlend(){
  if(blends.length> 0){
    var blend = blends.splice(0,1)
    console.log(`start blend ${blend}`)
    exec(`ffmpeg.exe -i red.jpg -i dogs.png -filter_complex "[1]eq=saturation=0:brightness=-.2:contrast=3[1a];[0][1a]scale2ref[a][b];[a]setdar=16/9[c];[b]setdar=16/9[d];[d][c]blend=c0_mode=${blend}[out]" -map "[out]" n-c0-${blend}.png`, function(){
      exec(`ffmpeg.exe -i red.jpg -i dogs.png -filter_complex "[0][1]scale2ref[a][b];[a]setdar=16/9[c];[b]setdar=16/9[d];[d][c]blend=c1_mode=${blend}[out]" -map "[out]" n-c1-${blend}.png`, function(){
        exec(`ffmpeg.exe -i red.jpg -i dogs.png -filter_complex "[0][1]scale2ref[a][b];[a]setdar=16/9[c];[b]setdar=16/9[d];[d][c]blend=c2_mode=${blend}[out]" -map "[out]" n-c2-${blend}.png`, function(){
          exec(`ffmpeg.exe -i red.jpg -i dogs.png -filter_complex "[0][1]scale2ref[a][b];[a]setdar=16/9[c];[b]setdar=16/9[d];[d][c]blend=c3_mode=${blend}[out]" -map "[out]" n-c3-${blend}.png`, function(){
            exec(`ffmpeg.exe -i red.jpg -i dogs.png -filter_complex "[0][1]scale2ref[a][b];[a]setdar=16/9[c];[b]setdar=16/9[d];[d][c]blend=all_mode=${blend}[out]" -map "[out]" n-all-${blend}.png`, function(){
              doBlend()
            })
          })
        })
      })
    })
    
  }else{
    console.log('complete!');
  }
} 
doBlend();