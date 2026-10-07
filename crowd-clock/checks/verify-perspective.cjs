const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const camera=html.match(/const SCENE_CAMERA=[\s\S]*?(?=function drawSharedGround)/)[0];
const ground=html.match(/function groundPoint\([^\n]+/)[0];
const results=[];
for(const [name,width,height]of [['desktop',1384,1384/1.5],['phone',378,525],['tablet',780,520]]){
 const s={width,height,square:{width:1536,height:1024}};vm.createContext(s);vm.runInContext(camera+'\n'+ground+'\nglobalThis.api={sceneCamera,groundPoint,humanHeight,SCENE_CAMERA,HUMAN_SCALE};',s);
 const a=s.api,c=a.sceneCamera(),sourceFootY=.64,z=(sourceFootY-.54)/.42,q=a.groundPoint(.58,z);assert.equal(q.x,(.58*1536-c.cropX)*c.scale);assert.equal(q.y,(sourceFootY*1024-c.cropY)*c.scale);
 assert(c.cropY>0);assert(c.cropY+height/c.scale<=1024);assert(c.cropX>=0&&c.cropX+width/c.scale<=1536);
 const depths=[.561,.64,.86,.91],calibration=depths.map(y=>{const z=(y-.54)/.42,p=a.groundPoint(.58,z),before=p.sceneHeight/a.SCENE_CAMERA.zoom*(.012+.118*z),after=p.sceneHeight*a.humanHeight(z);assert(after>before*1.4);return{sourceFootY:y,beforePixels:before,afterPixels:after};});
 for(let y=.54;y<.979;y+=.001)assert(a.humanHeight((y+.001-.54)/.42)>=a.humanHeight((y-.54)/.42));
 assert(calibration[1].afterPixels/calibration[1].beforePixels>2.4);results.push({viewport:name,canvas:[width,height],sharedGroundProjection:'passed',monotonicDepthScale:'passed',cameraZoom:a.SCENE_CAMERA.zoom,calibration});
}
assert(html.includes('people.sort((a,b)=>a.y-b.y)'));assert(html.includes('-cell.ax*scale,-cell.ay*scale'));assert(html.includes('COLUMNS=4,POSES=6'));assert(html.includes('new NetworkClockModel()'));assert(html.includes('class ClockModel'));
const report={method:'Depth anchors fitted to the illustrated doorways; not a measured camera reconstruction',population:256,depthSort:'preserved',spriteFootAnchors:'preserved',sixFrameAnimation:'preserved',cameraAndHeight:results};fs.writeFileSync('perspective-verification.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
