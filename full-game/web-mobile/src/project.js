window.__require=function t(e,i,c){function o(n,r){if(!i[n]){if(!e[n]){var a=n.split("/");if(a=a[a.length-1],!e[a]){var h="function"==typeof __require&&__require;if(!r&&h)return h(a,!0);if(s)return s(a,!0);throw new Error("Cannot find module '"+n+"'")}}var l=i[n]={exports:{}};e[n][0].call(l.exports,function(t){return o(e[n][1][t]||t)},l,l.exports,t,e,i,c)}return i[n].exports}for(var s="function"==typeof __require&&__require,n=0;n<c.length;n++)o(c[n]);return o}({BBBanim2:[function(t,e,i){"use strict";cc._RF.push(e,"cc2d4XiPiFAMIsBorxoX51v","BBBanim2");cc.Class({extends:cc.Component,properties:{sprite:cc.Node},onLoad:function(){this.sprite.opacity=0,this.lastPlay=0},start:function(){this.translate=new cc.MoveTo(6,cc.v3(0,-400,0)),this.opacity=new cc.FadeOut(1)},play:function(){return Date.now()-this.lastPlay>5e3&&(this.sprite.setPosition(0,0,0),this.sprite.opacity=255,this.sprite.runAction(this.translate),this.sprite.runAction(this.opacity),this.lastPlay=Date.now(),!0)}}),cc._RF.pop()},{}],BBBanim:[function(t,e,i){"use strict";cc._RF.push(e,"c09e255YjdMVIBxzDTqcmms","BBBanim");var c=function(t,e){return Math.random()*(e-t)+t};cc.Class({extends:cc.Component,properties:{minInterval:10,maxInterval:20,sprite:cc.Node},onLoad:function(){this.sprite.opacity=0,this.nextWave=Number.MAX_SAFE_INTEGER},begin:function(){this.translate=new cc.MoveBy(1,cc.v3(0,0,500)),this.scale=new cc.ScaleTo(1,2),this.opacity=new cc.FadeOut(1),this.nextWave=cc.director._totalFrames+60*c(this.minInterval,this.maxInterval)},play:function(){this.sprite.setPosition(0,0,0),this.sprite.setScale(1,1),this.sprite.opacity=255,this.sprite.runAction(this.translate),this.sprite.runAction(this.scale),this.sprite.runAction(this.opacity)},update:function(){cc.director._totalFrames<this.nextWave||(this.nextWave=cc.director._totalFrames+60*c(this.minInterval,this.maxInterval),this.play())},stop:function(){this.nextWave=Number.MAX_SAFE_INTEGER}}),cc._RF.pop()},{}],CenterCamera:[function(t,e,i){"use strict";cc._RF.push(e,"eb8c7/hTTRAQphcBdkQL44V","CenterCamera"),cc.Class({extends:cc.Component,properties:{target:cc.Node},start:function(){this.updatePos()},updatePos:function(){var t=this.node.eulerAngles.x,e=-Math.abs(this.node.z)*Math.tan(cc.misc.degreesToRadians(t));this.node.y=this.target.y+e,this.node.x=this.target.x}}),cc._RF.pop()},{}],Movement:[function(t,e,i){"use strict";cc._RF.push(e,"f61f0Q2X3dLUIBMt/XUes+m","Movement"),cc.Class({extends:cc.Component,properties:{target:t("../dolphin/pilot"),camera:t("./CenterCamera")},start:function(){this._prevPos=cc.v2(),this._dir=cc.v2(),this._moving=!1},onEnable:function(){this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this),this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this),this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this)},onDisable:function(){this.node.off(cc.Node.EventType.TOUCH_START,this.touchStart,this),this.node.off(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this),this.node.off(cc.Node.EventType.TOUCH_END,this.touchEnd,this)},touchStart:function(t){var e=t.touch;this._prevPos.set(e._point),this._moving=!0},touchMove:function(t){var e=t.touch;this._dir.set(e._point),this._dir.subSelf(this._prevPos),this._prevPos.set(e._point),this._dir.mag()<=1&&(this._dir.x=0,this._dir.y=0)},touchEnd:function(t){this.unscheduleAllCallbacks(),this.scheduleOnce(this.endMove,3)},endMove:function(){this._moving=!1},update:function(t){this._moving&&(this.target.move(this._dir),this.camera.updatePos())}}),cc._RF.pop()},{"../dolphin/pilot":"pilot","./CenterCamera":"CenterCamera"}],SonarCtrl:[function(t,e,i){"use strict";cc._RF.push(e,"99e08LnrDRLu5UYc+z1tKZW","SonarCtrl"),cc.Class({extends:cc.Component,properties:{dolphin:t("../dolphin/dolphin")},start:function(){this._startPos=cc.v2()},onEnable:function(){this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this),this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this)},onDisable:function(){this.node.off(cc.Node.EventType.TOUCH_START,this.touchStart,this),this.node.off(cc.Node.EventType.TOUCH_END,this.touchEnd,this)},touchStart:function(t){var e=t.touch;this._startPos.set(e._point)},touchEnd:function(t){t.touch._point.sub(this._startPos).mag()<3&&this.dolphin.shootBB()}}),cc._RF.pop()},{"../dolphin/dolphin":"dolphin"}],boids2:[function(t,e,i){"use strict";cc._RF.push(e,"dcc24esTQhEZpfSSwLZkNhF","boids2");var c=cc.vmath,o=c.vec3,s=c.quat,n=function(t,e){return Math.random()*(e-t)+t},r=function(t,e,i,c){t.x>i.x+10?t.x-=c.x:t.x<e.x-10&&(t.x+=c.x),t.y>i.y+10?t.y-=c.y:t.y<e.y-10&&(t.y+=c.y),t.z>i.z+10?t.z-=c.z:t.z<e.z-10&&(t.z+=c.z)},a=function(t,e){var i=o.mag(t);i>e&&o.scale(t,t,e/i)},h=function(t,e,i,c,s){o.scale(l,i,s/o.mag(i)),a(o.sub(l,l,e),c),o.add(t,t,l),i.active=!1},l=cc.v3(),d=cc.v3(),p=cc.v3(),u=cc.quat(),v=cc.v3(0,1,0);cc.v3(0,0,2e3);cc.Class({extends:cc.Component,properties:{model:cc.Prefab,modelCount:30,flockmateRadius:300,separationDistance:30,maxVelocity:2,alignmentForce:.03,cohesionForce:.03,separationForce:.03,guideForce:.09,minPos:cc.v3(-800,-400,-1e3),maxPos:cc.v3(-400,400,1e3),camera:cc.Node},initBoid:function(){var t=cc.instantiate(this.model);t.parent=this.node;var e=Math.random()*Math.PI*2,i=Math.random()*Math.PI*.5,c=3e3*Math.random();t.setPosition(Math.cos(e)*Math.sin(i)*c,Math.sin(e)*Math.sin(i)*c,Math.cos(i)),t.acc=cc.v3(),t.vel=cc.v3(this.range.x?n(-1,1):0,this.range.y?n(-1,1):0,this.range.z?n(-1,1):0),o.scale(t.vel,t.vel,this.maxVelocity);var s=t.getComponent(cc.SkeletonAnimation);return setTimeout(function(){return s.play()},1e3*Math.random()),this.nodes.push(t),t},onLoad:function(){this.range=o.sub(cc.v3(),this.maxPos,this.minPos),this.nodes=[],this.models=[],this.alignment=cc.v3(),this.alignment.active=!1,this.cohesion=cc.v3(),this.cohesion.active=!1,this.separation=cc.v3(),this.separation.active=!1,this.guide=cc.v3(),this.guide.active=!1;for(var t=0;t<this.modelCount;t++)this.initBoid()},update:function(){var t=this.minPos,e=this.maxPos,i=this.range,c=this.maxVelocity,n=this.alignment,m=this.cohesion,g=this.separation,f=this.guide,_=this.alignmentForce,b=this.cohesionForce,C=this.separationForce,y=this.guideForce,B=this.separationDistance,P=this.flockmateRadius,F=0,M=!0,x=!1,R=void 0;try{for(var T,E=this.nodes[Symbol.iterator]();!(M=(T=E.next()).done);M=!0){var w=T.value;o.set(n,0,0,0),o.set(m,0,0,0),o.set(g,0,0,0),o.set(w.acc,0,0,0);var S=!0,A=!1,D=void 0;try{for(var N,V=this.nodes[Symbol.iterator]();!(S=(N=V.next()).done);S=!0){var I=N.value;w!==I&&(w.getPosition(l),I.getPosition(d),o.sub(l,d,l),(F=Math.max(.1,o.mag(l)-200))<B&&(o.scale(p,l,-1/F),o.add(g,g,p),g.active=!0),F<P&&(o.add(m,m,l),m.active=!0,o.add(n,n,I.vel),n.active=!0))}}catch(t){A=!0,D=t}finally{try{!S&&V.return&&V.return()}finally{if(A)throw D}}n.active&&h(w.acc,w.vel,n,_,c),m.active&&h(w.acc,w.vel,m,b,c),g.active&&h(w.acc,w.vel,g,C,c),f.active&&(h(w.acc,w.vel,f,y,c),f.active=!0)}}catch(t){x=!0,R=t}finally{try{!M&&E.return&&E.return()}finally{if(x)throw R}}var k=!0,z=!1,L=void 0;try{for(var U,O=this.nodes[Symbol.iterator]();!(k=(U=O.next()).done);k=!0){var H=U.value;H.getPosition(l),a(o.add(H.vel,H.vel,H.acc),c),r(o.add(l,l,H.vel),t,e,i),H.setPosition(l),H.setRotation(s.fromViewUp(u,o.normalize(l,H.vel),v))}}catch(t){z=!0,L=t}finally{try{!k&&O.return&&O.return()}finally{if(z)throw L}}}}),cc._RF.pop()},{}],boidspre:[function(t,e,i){"use strict";cc._RF.push(e,"b504fJVoWJGdaZwqel933Mo","boidspre"),cc.Class({extends:cc.Component,properties:{},start:function(){this.scheduleOnce(function(){cc.director.loadScene("cartoon")},25)}}),cc._RF.pop()},{}],boids:[function(t,e,i){"use strict";cc._RF.push(e,"e0a3cNkf2hDvLa/HrvXmmY4","boids");var c=cc.vmath,o=c.vec3,s=c.quat,n=function(t,e){return Math.random()*(e-t)+t},r=function(t,e){var i=o.mag(t);i>e&&o.scale(t,t,e/i)},a=function(t,e,i,c,s){o.scale(d,i,s/o.mag(i)),r(o.sub(d,d,e),c),o.add(t,t,d),i.active=!1},h=t("./sonar"),l=t("./DolphinPreb/BBBanim"),d=cc.v3(),p=cc.v3(),u=cc.v3(),v=cc.quat(),m=cc.v3(0,1,0),g=cc.v3(0,0,2e3);cc.Class({extends:cc.Component,properties:{model:cc.Prefab,modelCount:30,flockmateRadius:300,separationDistance:30,maxVelocity:2,alignmentForce:.03,cohesionForce:.03,separationForce:.03,guideForce:.09,minPos:cc.v3(-800,-400,-1e3),maxPos:cc.v3(-400,400,1e3),camera:cc.Node},initBoid:function(){var t=cc.instantiate(this.model);t.parent=this.node;var e=Math.random()*Math.PI*2,i=Math.random()*Math.PI*.5,c=800*Math.random();t.setPosition(Math.cos(e)*Math.sin(i)*c,Math.sin(e)*Math.sin(i)*c,Math.cos(i)),t.acc=cc.v3(),t.vel=cc.v3(this.range.x?n(-1,1):0,this.range.y?n(-1,1):0,this.range.z?n(-1,1):0),o.scale(t.vel,t.vel,this.maxVelocity);var s=t.getComponent(cc.SkeletonAnimation);return setTimeout(function(){return s.play()},1e3*Math.random()),this.nodes.push(t),t},onLoad:function(){var t=this;this.range=o.sub(cc.v3(),this.maxPos,this.minPos),this.nodes=[],this.models=[],this.alignment=cc.v3(),this.alignment.active=!1,this.cohesion=cc.v3(),this.cohesion.active=!1,this.separation=cc.v3(),this.separation.active=!1,this.guide=cc.v3(),this.guide.active=!1;var e=this.initBoid();e.vel=cc.v3(.1,1,0),e.setPosition(0,1200,0);var i=e.getComponentInChildren(h),c=e.getComponentInChildren(l);i.begin(),c.begin(),cc.director.on(cc.Director.EVENT_AFTER_UPDATE,function(){o.add(d,e.getPosition(p),g),t.camera.setPosition(d)}),setTimeout(function(){for(var e=0;e<t.modelCount;e++)t.initBoid().vel=cc.v3(0,1,0);t.nodes.forEach(function(t){var e=t.getComponentInChildren(h),i=t.getComponentInChildren(l);e.begin(),i.begin()})},5e3),setTimeout(function(){cc.SceneMgr.brighten(5)},15e3),setTimeout(function(){cc.SceneMgr.taichi(5)},3e4),setTimeout(function(){cc.SceneMgr.pitchBlack(5),t.nodes.forEach(function(t){var e=t.getComponentInChildren(h),i=t.getComponentInChildren(l);e.stop(),i.stop()})},45e3)},update:function(){this.minPos,this.maxPos,this.range;var t=this.maxVelocity,e=this.alignment,i=this.cohesion,c=this.separation,n=this.guide,h=this.alignmentForce,l=this.cohesionForce,g=this.separationForce,f=this.guideForce,_=this.separationDistance,b=this.flockmateRadius,C=0,y=!0,B=!1,P=void 0;try{for(var F,M=this.nodes[Symbol.iterator]();!(y=(F=M.next()).done);y=!0){var x=F.value;o.set(e,0,0,0),o.set(i,0,0,0),o.set(c,0,0,0),o.set(x.acc,0,0,0);var R=!0,T=!1,E=void 0;try{for(var w,S=this.nodes[Symbol.iterator]();!(R=(w=S.next()).done);R=!0){var A=w.value;x!==A&&(x.getPosition(d),A.getPosition(p),o.sub(d,p,d),(C=Math.max(.1,o.mag(d)-200))<_&&(o.scale(u,d,-1/C),o.add(c,c,u),c.active=!0),C<b&&(o.add(i,i,d),i.active=!0,o.add(e,e,A.vel),e.active=!0))}}catch(t){T=!0,E=t}finally{try{!R&&S.return&&S.return()}finally{if(T)throw E}}e.active&&a(x.acc,x.vel,e,h,t),i.active&&a(x.acc,x.vel,i,l,t),c.active&&a(x.acc,x.vel,c,g,t),n.active&&(a(x.acc,x.vel,n,f,t),n.active=!0)}}catch(t){B=!0,P=t}finally{try{!y&&M.return&&M.return()}finally{if(B)throw P}}var D=!0,N=!1,V=void 0;try{for(var I,k=this.nodes[Symbol.iterator]();!(D=(I=k.next()).done);D=!0){var z=I.value;z.getPosition(d),r(o.add(z.vel,z.vel,z.acc),t),o.add(d,d,z.vel),z.setPosition(d),z.setRotation(s.fromViewUp(v,o.normalize(d,z.vel),m))}}catch(t){N=!0,V=t}finally{try{!D&&k.return&&k.return()}finally{if(N)throw V}}}}),cc._RF.pop()},{"./DolphinPreb/BBBanim":"BBBanim","./sonar":"sonar"}],cartoon:[function(t,e,i){"use strict";cc._RF.push(e,"09eed/wwGdPfor4OEqR0M88","cartoon"),cc.Class({extends:cc.Component,properties:{},start:function(){this.node.getComponent(cc.Animation).on("finished",function(){cc.director.loadScene("level")})}}),cc._RF.pop()},{}],dolphin:[function(t,e,i){"use strict";cc._RF.push(e,"96658rWv+JPc6Dy3cV03Nk0","dolphin"),cc.Class({extends:cc.Component,properties:{bbb:t("../../DolphinPreb/BBBanim2"),sonar:t("../../sonar2"),root:cc.Node,target:cc.Node},start:function(){this.ani=this.node.getComponent(cc.SkeletonAnimation),this.body=this.node.parent.getComponent(cc.RigidBody),this.pt0=cc.v2(),this.pt1=cc.v2(),this.pt2=cc.v2(),this.pt=cc.v2(),this._accum=0,this._turn=0,this.ani.play("move"),this.feedback=cc.find("sonar/feedback"),this.vector=null},update:function(t){if(this._accum+=t,this._accum>1){var e=this.pt0,i=this.pt1,c=this.pt2;this.pt.x=this.node.parent.x,this.pt.y=this.node.parent.y,e.set(i),i.set(c),c.set(this.pt);var o=this.pt.mag();o>1200&&20!==this.root.z?this.root.z=cc.misc.lerp(this.root.z,40,.1):o<=1200&&-40!==this.root.z&&(this.root.z=cc.misc.lerp(this.root.z,-40,.1)),this.target._position.sub(this.pt).mag()<200&&(cc.director.loadScene("boids"),this.enabled=!1)}},turnMove:function(){this.ani.playAdditive("move")},showFeedback:function(){var t=this.vector.normalizeSelf().mulSelf(450);this.feedback.setPosition(t),this.feedback.angle=this.angle-90,this.feedback.active=!0,this.scheduleOnce(function(){this.feedback.active=!1},3)},shootBB:function(){var t=this.bbb.play();if(this.sonar.activate(),t){var e=this.node.parent,i=e.eulerAngles.z;this.vector=this.target._position.sub(e._position),this.angle=180*Math.atan2(this.vector.y,this.vector.x)/Math.PI,Math.abs(i-this.angle)<30&&this.scheduleOnce(this.showFeedback,5)}}}),cc._RF.pop()},{"../../DolphinPreb/BBBanim2":"BBBanim2","../../sonar2":"sonar2"}],environment:[function(t,e,i){"use strict";cc._RF.push(e,"c80beAhMoJG1YK4VaaqpX5F","environment"),cc.macro.ENABLE_WEBGL_ANTIALIAS=!0,cc.Class({extends:cc.Component,editor:{executeInEditMode:!0}}),cc._RF.pop()},{}],login:[function(t,e,i){"use strict";cc._RF.push(e,"4b2bd0HjgZDjbSq1rZfomeA","login"),cc.Class({extends:cc.Component,properties:{},start:function(){this.node.on("touchend",function(){cc.director.loadScene("boids-pre")})}}),cc._RF.pop()},{}],"physics-settings":[function(t,e,i){"use strict";cc._RF.push(e,"5f592qU2sZK8bTR24SBz6/f","physics-settings"),cc.game.on(cc.game.EVENT_ENGINE_INITED,function(){var t=cc.director.getPhysicsManager();t.enabled=!0,t.gravity=cc.v2(),cc.director.getPhysicsManager().debugDrawFlags=cc.PhysicsManager.DrawBits.e_aabbBit|cc.PhysicsManager.DrawBits.e_jointBit|cc.PhysicsManager.DrawBits.e_shapeBit}),cc._RF.pop()},{}],"physics-world":[function(t,e,i){"use strict";cc._RF.push(e,"26f87Vk8kpEZpzrs+A8SU9t","physics-world"),cc.Class({extends:cc.Component,properties:{debug:!0},start:function(){cc.director.getPhysicsManager().debugDrawFlags=this.debug?cc.PhysicsManager.DrawBits.e_aabbBit|cc.PhysicsManager.DrawBits.e_jointBit|cc.PhysicsManager.DrawBits.e_shapeBit:0,cc.director.getPhysicsManager()._debugDrawer.node.group="3d",cc.debug.setDisplayStats(!0),cc.find("PROFILER-NODE").group="default"}}),cc._RF.pop()},{}],pilot:[function(t,e,i){"use strict";cc._RF.push(e,"bfe51YyT+VMbYPMX1Dwz89G","pilot"),cc.Class({extends:cc.Component,properties:{speed:10},start:function(){this._body=this.node.getComponent(cc.RigidBody)},move:function(t){this._body.linearVelocity=t.mul(this.speed)}}),cc._RF.pop()},{}],postProcessing:[function(t,e,i){"use strict";cc._RF.push(e,"94c2cnx6bxC9bf7ucDqUL0j","postProcessing"),cc.macro.ENABLE_WEBGL_ANTIALIAS=!0,cc.Class({extends:cc.Component,properties:{sceneCamera:cc.Camera,camBloomCut:cc.Camera,camBloomBlurV:cc.Camera,camBloomBlurH:cc.Camera,spBloomCut:cc.Sprite,spBloomBlurV:cc.Sprite,spBloomBlurH:cc.Sprite,spBloomBlend:cc.Sprite},onLoad:function(){var t=cc.game._renderContext;this.spBloomCut.node.width=cc.visibleRect.width,this.spBloomCut.node.height=.9*cc.visibleRect.height,this.spBloomBlurV.node.width=cc.visibleRect.width,this.spBloomBlurV.node.height=.9*cc.visibleRect.height,this.spBloomBlurH.node.width=cc.visibleRect.width,this.spBloomBlurH.node.height=.9*cc.visibleRect.height,this.spBloomBlend.node.width=cc.visibleRect.width,this.spBloomBlend.node.height=cc.visibleRect.height;var e=new cc.RenderTexture;e.initWithSize(cc.visibleRect.width,cc.visibleRect.height,t.DEPTH_STENCIL);var i=new cc.RenderTexture;i.initWithSize(cc.visibleRect.width,cc.visibleRect.height,t.DEPTH_STENCIL);var c=new cc.RenderTexture;c.initWithSize(cc.visibleRect.width,cc.visibleRect.height,t.DEPTH_STENCIL);var o=cc.v2(1/cc.visibleRect.width,1/cc.visibleRect.height),s=cc.v3(cc.visibleRect.width,cc.visibleRect.height,cc.visibleRect.width/cc.visibleRect.height),n=cc.quat(.1945946,.1216216,.054054,.016216);this.sceneCamera.targetTexture=e,this.spBloomCut.getMaterial(0).setProperty("texture",e.getImpl()),this.camBloomCut.targetTexture=i;var r=this.spBloomBlurV.getMaterial(0);r.setProperty("texture",i.getImpl()),r.setProperty("params",cc.quat(o.x,o.y,1,.227027)),r.setProperty("weights",n),this.camBloomBlurV.targetTexture=c;var a=this.spBloomBlurH.getMaterial(0);a.setProperty("texture",c.getImpl()),a.setProperty("params",cc.quat(o.x,o.y,0,.227027)),a.setProperty("weights",n),this.camBloomBlurH.targetTexture=i;var h=this.vigMat=this.spBloomBlend.getMaterial(0);h.setProperty("origin",e.getImpl()),h.setProperty("blurred",i.getImpl()),h.setProperty("resolution",s),this.step=0,this.targetTime=-1,this.currentValue=.5},update:function(){if(!(cc.director._totalFrames>this.targetTime)){var t=this.currentValue+this.step;this.vigMat.setProperty("vignette",t),this.currentValue=t}},lerpVig:function(t,e){var i=cc.director._totalFrames;this.targetTime=i+60*e,this.targetValue=t,this.step=(t-this.currentValue)/(this.targetTime-i)}}),cc._RF.pop()},{}],sceneMgr:[function(t,e,i){"use strict";cc._RF.push(e,"87b8bnjo8BAx5DlazMyYI8n","sceneMgr");var c=function(t){cc.director.on(cc.Director.EVENT_AFTER_UPDATE,function e(){t()&&cc.director.off(cc.Director.EVENT_AFTER_UPDATE,e)})};cc.Class({extends:cc.Component,properties:{camera:cc.Camera,boids:t("boids"),boidsMaterial:cc.Material,postProcessing:t("postProcessing")},start:function(){cc.SceneMgr=this,this.bright=cc.color("#F1882D"),this.darkBG=cc.color("#012222"),this.dark=cc.color("#337F7F"),this.color=this.darkBG.clone(),this.colorBG=this.darkBG.clone()},guideBoids:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,o=cc.director._totalFrames+60*i;this.boids.guide.set(t),this.boids.guide.active=!0,c(function(){if(cc.director._totalFrames>o)return e.boids.guide.active=!1,!0}.bind(this))},lerpCameraColor:function(t,e){var i=this,o=cc.director._totalFrames,s=60*e,n=o+s,r=cc.color();c(function(){var e=cc.director._totalFrames;if(e>n)return i.colorBG.set(r),i.camera.backgroundColor=r,!0;i.colorBG.lerp(t,(e-o)/s,r),i.camera.backgroundColor=r}.bind(this))},lerpBoidsColor:function(t,e){var i=this,o=cc.director._totalFrames,s=60*e,n=o+s,r=cc.color();c(function(){var e=cc.director._totalFrames;if(e>n)return i.color.set(r),i.boidsMaterial.setProperty("diffuseColor",r),!0;i.color.lerp(t,(e-o)/s,r),i.boidsMaterial.setProperty("diffuseColor",r)}.bind(this))},lerpVignetteColor:function(t,e){this.postProcessing.lerpVig(t,e)},brighten:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.lerpCameraColor(this.bright,t),this.lerpBoidsColor(this.bright,t),this.lerpVignetteColor(0,t)},darken:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.lerpCameraColor(this.darkBG,t),this.lerpBoidsColor(this.dark,t),this.lerpVignetteColor(.5,t)},taichi:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.lerpCameraColor(cc.color("#FFFFFF"),t),this.lerpBoidsColor(cc.color(),t),this.lerpVignetteColor(.2,t)},invTaichi:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.lerpCameraColor(cc.color(),t),this.lerpBoidsColor(cc.color("#FFFFFF"),t),this.lerpVignetteColor(.2,t)},pitchBlack:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.lerpCameraColor(cc.color(),t),this.lerpBoidsColor(cc.color(),t)},random:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=cc.color(255*Math.random(),255*Math.random(),255*Math.random(),255);this.lerpCameraColor(e,t);var i=cc.color(255*Math.random(),255*Math.random(),255*Math.random(),255);this.lerpBoidsColor(i,t),this.lerpVignetteColor(.5*Math.random(),t)}}),cc._RF.pop()},{boids:"boids",postProcessing:"postProcessing"}],sonar2:[function(t,e,i){"use strict";cc._RF.push(e,"7762cQPHx1Oz74aTBj71cZA","sonar2");cc.Class({extends:cc.Component,properties:{},onLoad:function(){var t=this;this.animation=this.getComponent(cc.Animation),this.animation.play(),cc.director.once(cc.Director.EVENT_AFTER_UPDATE,function(){return t.animation.stop()})},activate:function(){this.animation.play(),cc.WorldMgr.sonarDetect()}}),cc._RF.pop()},{}],sonar:[function(t,e,i){"use strict";cc._RF.push(e,"3d0cff7m2pPTZJQxgp18w5D","sonar");var c=function(t,e){return Math.random()*(e-t)+t};cc.Class({extends:cc.Component,properties:{minInterval:10,maxInterval:20},onLoad:function(){var t=this;this.animation=this.getComponent(cc.Animation),this.animation.play(),cc.director.once(cc.Director.EVENT_AFTER_UPDATE,function(){return t.animation.stop()}),this.nextWave=Number.MAX_SAFE_INTEGER},begin:function(){this.nextWave=cc.director._totalFrames+60*c(this.minInterval,this.maxInterval)},update:function(t){cc.director._totalFrames<this.nextWave||(this.nextWave=cc.director._totalFrames+60*c(this.minInterval,this.maxInterval),this.animation.play())},stop:function(){this.nextWave=Number.MAX_SAFE_INTEGER}}),cc._RF.pop()},{}],worldMgr:[function(t,e,i){"use strict";function c(t,e,i){return t+(e-t)*i}cc._RF.push(e,"04758GvAMVCgYpPLpQ1Fgsz","worldMgr");cc.Class({extends:cc.Component,properties:{materials:[cc.Material],vignette:2,postProcessing:t("postProcessing")},start:function(){cc.WorldMgr=this,this.obstacleCBs={},this.postProcessing.lerpVig(this.vignette,1),this.mat=this.materials[0]},sonarDetect:function(){var t=this;this.postProcessing.lerpVig(.5,1),setTimeout(function(){return t.postProcessing.lerpVig(t.vignette,2)},1e3)},brightenWorld:function(){var t=!0,e=!1,i=void 0;try{for(var c,o=this.materials[Symbol.iterator]();!(t=(c=o.next()).done);t=!0){var s=c.value;this.lerpObstableBrightness(s)}}catch(t){e=!0,i=t}finally{try{!t&&o.return&&o.return()}finally{if(e)throw i}}},lerpObstableBrightness:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3,s=cc.director._totalFrames,n=60*o,r=s+n;this.obstacleCBs[t]=!0;var a=t.getProperty("brightness");(function(t){cc.director.on(cc.Director.EVENT_AFTER_UPDATE,function e(){t()&&cc.director.off(cc.Director.EVENT_AFTER_UPDATE,e)})})(function(){var o=cc.director._totalFrames;if(o>r)return t.setProperty("brightness",a),e.obstacleCBs[t]=!1,!0;var h=a,l=(o-s)/n;h=l<.2?c(a,i,l/.2):c(i,a,(l-.2)/.8),t.setProperty("brightness",Math.sqrt(h))}.bind(this))}}),cc._RF.pop()},{postProcessing:"postProcessing"}]},{},["BBBanim","BBBanim2","boids","boids2","postProcessing","sceneMgr","boidspre","cartoon","login","CenterCamera","Movement","SonarCtrl","dolphin","pilot","environment","physics-settings","physics-world","sonar","sonar2","worldMgr"]);