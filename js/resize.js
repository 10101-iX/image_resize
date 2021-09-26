var resizeableImage=function(image_target){var $container,orig_src=new Image(),image_target=$(image_target).get(0),event_state={},constrain=!1,min_width=60,min_height=60,max_width=1800,max_height=1900,init_height=500,resize_canvas=document.createElement('canvas');imageData=null;var fileName,fileType;init=function(){$('.js-loadfile').change(function(evt){var files=evt.target.files;var reader=new FileReader();fileName=files[0].name;fileType=files[0].type;reader.onload=function(e){imageData=reader.result;loadData()}
reader.readAsDataURL(files[0])});$('.js-reset').click(function(){if(imageData)
loadData()});orig_src.src=image_target.src;$(image_target).height(init_height).wrap('<div class="resize-container"></div>').before('<span class="resize-handle resize-handle-nw"></span>').before('<span class="resize-handle resize-handle-ne"></span>').after('<span class="resize-handle resize-handle-se"></span>').after('<span class="resize-handle resize-handle-sw"></span>');$container=$('.resize-container');$container.prepend('<div class="resize-container-ontop"></div>');$container.on('mousedown touchstart','.resize-handle',startResize);$container.on('mousedown touchstart','.resize-container-ontop',startMoving);$('.js-crop').on('click',crop)};loadData=function(){image_target.src=imageData;orig_src.src=image_target.src;$(image_target).css({width:'auto',height:init_height});$(orig_src).bind('load',function(){resizeImageCanvas($(image_target).width(),$(image_target).height())})};startResize=function(e){e.preventDefault();e.stopPropagation();saveEventState(e);$(document).on('mousemove touchmove',resizing);$(document).on('mouseup touchend',endResize)};endResize=function(e){resizeImageCanvas($(image_target).width(),$(image_target).height())
e.preventDefault();$(document).off('mouseup touchend',endResize);$(document).off('mousemove touchmove',resizing)};saveEventState=function(e){event_state.container_width=$container.width();event_state.container_height=$container.height();event_state.container_left=$container.offset().left;event_state.container_top=$container.offset().top;event_state.mouse_x=(e.clientX||e.pageX||e.originalEvent.touches[0].clientX)+$(window).scrollLeft();event_state.mouse_y=(e.clientY||e.pageY||e.originalEvent.touches[0].clientY)+$(window).scrollTop();if(typeof e.originalEvent.touches!=='undefined'){event_state.touches=[];$.each(e.originalEvent.touches,function(i,ob){event_state.touches[i]={};event_state.touches[i].clientX=0+ob.clientX;event_state.touches[i].clientY=0+ob.clientY})}
event_state.evnt=e};resizing=function(e){var mouse={},width,height,left,top,offset=$container.offset();mouse.x=(e.clientX||e.pageX||e.originalEvent.touches[0].clientX)+$(window).scrollLeft();mouse.y=(e.clientY||e.pageY||e.originalEvent.touches[0].clientY)+$(window).scrollTop();if($(event_state.evnt.target).hasClass('resize-handle-se')){width=mouse.x-event_state.container_left;height=mouse.y-event_state.container_top;left=event_state.container_left;top=event_state.container_top}else if($(event_state.evnt.target).hasClass('resize-handle-sw')){width=event_state.container_width-(mouse.x-event_state.container_left);height=mouse.y-event_state.container_top;left=mouse.x;top=event_state.container_top}else if($(event_state.evnt.target).hasClass('resize-handle-nw')){width=event_state.container_width-(mouse.x-event_state.container_left);height=event_state.container_height-(mouse.y-event_state.container_top);left=mouse.x;top=mouse.y;if(constrain||e.shiftKey){top=mouse.y-((width/orig_src.width*orig_src.height)-height)}}else if($(event_state.evnt.target).hasClass('resize-handle-ne')){width=mouse.x-event_state.container_left;height=event_state.container_height-(mouse.y-event_state.container_top);left=event_state.container_left;top=mouse.y;if(constrain||e.shiftKey){top=mouse.y-((width/orig_src.width*orig_src.height)-height)}}
if(constrain||e.shiftKey){height=width/orig_src.width*orig_src.height}
if(width>min_width&&height>min_height&&width<max_width&&height<max_height){resizeImage(width,height);$container.offset({'left':left,'top':top})}}
resizeImage=function(width,height){$(image_target).width(width).height(height)};resizeImageCanvas=function(width,height){resize_canvas.width=width;resize_canvas.height=height;resize_canvas.getContext('2d').drawImage(orig_src,0,0,width,height);$(image_target).attr('src',resize_canvas.toDataURL("image/png"))};startMoving=function(e){e.preventDefault();e.stopPropagation();saveEventState(e);$(document).on('mousemove touchmove',moving);$(document).on('mouseup touchend',endMoving)};endMoving=function(e){e.preventDefault();$(document).off('mouseup touchend',endMoving);$(document).off('mousemove touchmove',moving)};moving=function(e){var mouse={},touches;e.preventDefault();e.stopPropagation();touches=e.originalEvent.touches;mouse.x=(e.clientX||e.pageX||touches[0].clientX)+$(window).scrollLeft();mouse.y=(e.clientY||e.pageY||touches[0].clientY)+$(window).scrollTop();$container.offset({'left':mouse.x-(event_state.mouse_x-event_state.container_left),'top':mouse.y-(event_state.mouse_y-event_state.container_top)});if(event_state.touches&&event_state.touches.length>1&&touches.length>1){var width=event_state.container_width,height=event_state.container_height;var a=event_state.touches[0].clientX-event_state.touches[1].clientX;a=a*a;var b=event_state.touches[0].clientY-event_state.touches[1].clientY;b=b*b;var dist1=Math.sqrt(a+b);a=e.originalEvent.touches[0].clientX-touches[1].clientX;a=a*a;b=e.originalEvent.touches[0].clientY-touches[1].clientY;b=b*b;var dist2=Math.sqrt(a+b);var ratio=dist2/dist1;width=width*ratio;height=height*ratio;resizeImage(width,height)}};crop=function(){var crop_canvas,left=$('.overlay').offset().left-$container.offset().left,top=$('.overlay').offset().top-$container.offset().top,width=$('.overlay').width(),height=$('.overlay').height();crop_canvas=document.createElement('canvas');crop_canvas.width=width;crop_canvas.height=height;crop_canvas.getContext('2d').drawImage(image_target,left,top,width,height,0,0,width,height);var dataURL=crop_canvas.toDataURL("image/png");image_target.src=dataURL;orig_src.src=image_target.src;$(image_target).bind("load",function(){$(this).css({width:width,height:height}).unbind('load').parent().css({top:$('.overlay').offset().top-$('.crop-wrapper').offset().top,left:$('.overlay').offset().left-$('.crop-wrapper').offset().left})});crop_canvas.toBlob(function(blob){var fkb=Math.round(blob.size/1000);var o=new Option("option text","value");$(o).html(fkb+"kB");$("#c1").empty().append(o);crop_canvas.toBlob(function(blob){var fkb=Math.round(blob.size/1000);var o=new Option("option text","value");$(o).html(fkb+"kB");$("#c2").empty().append(o);crop_canvas.toBlob(function(blob){var fkb=Math.round(blob.size/1000);var o=new Option("option text","value");$(o).html(fkb+"kB");$("#c3").empty().append(o);crop_canvas.toBlob(function(blob){var fkb=Math.round(blob.size/1000);var o=new Option("option text","value");$(o).html(fkb+"kB");$("#c4").empty().append(o)},'image/jpeg',0.75)},'image/jpeg',0.85)},'image/jpeg',0.95)},'image/jpeg',1)}
downloadPNG=function()
{var c,left=$('.overlay').offset().left-$container.offset().left,top=$('.overlay').offset().top-$container.offset().top,width=$('.overlay').width(),height=$('.overlay').height();c=document.createElement('canvas');c.width=width;c.height=height;c.getContext('2d').drawImage(image_target,left,top,width,height,0,0,width,height);var link=document.createElement("a");var fpath=fileName;fpath=fpath.replace(/\\/g,'/');var fname=fpath.substring(fpath.lastIndexOf('/')+1,fpath.lastIndexOf('.'));link.download=fname+".png";if(c.toBlob){c.toBlob(function(blob){link.href=URL.createObjectURL(blob);document.body.appendChild(link);link.click();document.body.removeChild(link)},'image/png')}
else{link.href=canvas.toDataURL();document.body.appendChild(link);link.click();document.body.removeChild(link)}};downloadJPG=function()
{var c,left=$('.overlay').offset().left-$container.offset().left,top=$('.overlay').offset().top-$container.offset().top,width=$('.overlay').width(),height=$('.overlay').height();c=document.createElement('canvas');c.width=width;c.height=height;c.getContext('2d').drawImage(image_target,left,top,width,height,0,0,width,height);var link=document.createElement("a");var fpath=fileName;fpath=fpath.replace(/\\/g,'/');var fname=fpath.substring(fpath.lastIndexOf('/')+1,fpath.lastIndexOf('.'));link.download=fname+".jpg";var quality=[1,0.95,0.85,0.75];var q=$("#fileSize")[0].selectedIndex;c.toBlob(function(blob){link.href=URL.createObjectURL(blob);document.body.appendChild(link);link.click();document.body.removeChild(link)},'image/jpeg',quality[q])};superScan=function()
{var c,left=$('.overlay').offset().left-$container.offset().left,top=$('.overlay').offset().top-$container.offset().top,width=$('.overlay').width(),height=$('.overlay').height();c=document.createElement('canvas');c.width=width;c.height=height;var ctx=c.getContext('2d');ctx.drawImage(image_target,left,top,width,height,0,0,width,height);ctx.putImageData(Filters.filterImage(Filters.convolute,Filters.grayscale(Filters.getPixels()),[-0.2,-0.2,-0.2,-0.2,3,-0.2,-0.2,-0.2,-0.2]),0,0);superThreshold(c,ctx,120,width,height)};superThreshold=function(c,imgCtx,threshold,w,h){var pixels=imgCtx.getImageData(0,0,w,h);var d=pixels.data;for(var i=0;i<d.length;i+=4){var r=d[i];var g=d[i+1];var b=d[i+2];var max=Math.max(r,g,b);var min=Math.min(r,g,b);if((max-min)<70)
{if(0.2126*r+0.7152*g+0.0722*b>=threshold)
{d[i]=d[i+1]=d[i+2]=255}}}
imgCtx.putImageData(pixels,0,0);var dataURL=c.toDataURL("image/png");image_target.src=dataURL;orig_src.src=image_target.src;$(image_target).bind("load",function(){$(this).css({width:width,height:height}).unbind('load').parent().css({top:$('.overlay').offset().top-$('.crop-wrapper').offset().top,left:$('.overlay').offset().left-$('.crop-wrapper').offset().left})})};Filters={};Filters.getPixels=function(){var c,left=$('.overlay').offset().left-$container.offset().left,top=$('.overlay').offset().top-$container.offset().top,width=$('.overlay').width(),height=$('.overlay').height();c=document.createElement('canvas');c.width=width;c.height=height;var ctxa=c.getContext('2d');ctxa.drawImage(image_target,left,top,width,height,0,0,width,height);return ctxa.getImageData(0,0,c.width,c.height)};Filters.getCanvas=function(w,h){var ca=document.createElement('canvas');ca.width=w;ca.height=h;return ca};Filters.filterImage=function(filter,image,var_args){var args=[this.getPixels(image)];for(var i=2;i<arguments.length;i++){args.push(arguments[i])}
return filter.apply(null,args)};Filters.grayscale=function(pixels,args){var d=pixels.data;for(var i=0;i<d.length;i+=4){var r=d[i];var g=d[i+1];var b=d[i+2];var v=0.2126*r+0.7152*g+0.0722*b;d[i]=d[i+1]=d[i+2]=v}
return pixels};Filters.brightness=function(pixels,adjustment){var d=pixels.data;for(var i=0;i<d.length;i+=4){d[i]+=adjustment;d[i+1]+=adjustment;d[i+2]+=adjustment}
return pixels};Filters.threshold=function(pixels,threshold){var d=pixels.data;for(var i=0;i<d.length;i+=4){var r=d[i];var g=d[i+1];var b=d[i+2];var v=(0.2126*r+0.7152*g+0.0722*b>=threshold)?255:0;d[i]=d[i+1]=d[i+2]=v}
return pixels};Filters.tmpCanvas=document.createElement('canvas');Filters.tmpCtx=Filters.tmpCanvas.getContext('2d');Filters.createImageData=function(w,h){return this.tmpCtx.createImageData(w,h)};Filters.convolute=function(pixels,weights,opaque){var side=Math.round(Math.sqrt(weights.length));var halfSide=Math.floor(side/2);var src=pixels.data;var sw=pixels.width;var sh=pixels.height;var w=sw;var h=sh;var output=Filters.createImageData(w,h);var dst=output.data;var alphaFac=opaque?1:0;for(var y=0;y<h;y++){for(var x=0;x<w;x++){var sy=y;var sx=x;var dstOff=(y*w+x)*4;var r=0,g=0,b=0,a=0;for(var cy=0;cy<side;cy++){for(var cx=0;cx<side;cx++){var scy=sy+cy-halfSide;var scx=sx+cx-halfSide;if(scy>=0&&scy<sh&&scx>=0&&scx<sw){var srcOff=(scy*sw+scx)*4;var wt=weights[cy*side+cx];r+=src[srcOff]*wt;g+=src[srcOff+1]*wt;b+=src[srcOff+2]*wt;a+=src[srcOff+3]*wt}}}
dst[dstOff]=r;dst[dstOff+1]=g;dst[dstOff+2]=b;dst[dstOff+3]=a+alphaFac*(255-a)}}
return output};init()};resizeableImage($('.resize-image'));var sizeOpt=document.getElementById("sizeOptions");sizeOpt.addEventListener("change",function(){var w=document.getElementById("width");var h=document.getElementById("height");var selected=sizeOpt.options[sizeOpt.selectedIndex];var ww=selected.getAttribute('data-width');var hh=selected.getAttribute('data-height');w.value=ww;h.value=hh;$(".overlay").width(ww);$(".overlay").height(hh);var hi=parseInt(hh)+2;$(".left-overlay").height(hi);$(".right-overlay").height(hi);$(".bottom-overlay").css('margin-bottom',(150-hh-2)+'px');$(".left-overlay").css('margin-right',(150-ww-2)+'px')});var widthOpt=document.getElementById("width");widthOpt.addEventListener("change",function(){sizeOpt.selectedIndex=0;var ww=widthOpt.value;var hh=heightOpt.value;$(".overlay").width(ww);$(".overlay").height(hh);var hi=parseInt(hh)+2;$(".left-overlay").height(hi);$(".right-overlay").height(hi);$(".bottom-overlay").css('margin-bottom',(150-hh-2)+'px');$(".left-overlay").css('margin-right',(150-ww-2)+'px')});var heightOpt=document.getElementById("height");heightOpt.addEventListener("change",function(){sizeOpt.selectedIndex=0;var ww=widthOpt.value;var hh=heightOpt.value;$(".overlay").width(ww);$(".overlay").height(hh);var hi=parseInt(hh)+2;$(".left-overlay").height(hi);$(".right-overlay").height(hi);$(".bottom-overlay").css('margin-bottom',(150-hh-2)+'px');$(".left-overlay").css('margin-right',(150-ww-2)+'px')});var wid=document.getElementById("w");var hid=document.getElementById("h");var rid=document.getElementById("r");wid.addEventListener("change",function(){var w=wid.value;var h=hid.value;var r=rid.value;var www=Math.round(0.393701*w*r);var hhh=Math.round(0.393701*h*r);$("#wr").html(www);$("#hr").html(hhh);console.log(w,h,r)});hid.addEventListener("change",function(){var w=wid.value;var h=hid.value;var r=rid.value;var www=Math.round(0.393701*w*r);var hhh=Math.round(0.393701*h*r);$("#wr").html(www);$("#hr").html(hhh);console.log(www,hhh)})