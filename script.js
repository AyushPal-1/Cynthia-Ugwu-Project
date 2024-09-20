const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
let timeout
function circle(){
    let xscale = 1
    let yscale = 1
    let xprev = 0
    let yprev = 0
    window.addEventListener("mousemove", function(dets){
        this.clearTimeout(timeout)
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev)
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev)

        xprev = dets.clientX
        yprev = dets.clientY
        custommouse(xscale, yscale)
        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`
        }, 100)

    })
}

function firstpageAnim(){
    let t1 = gsap.timeline();
    t1.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
     .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        delay: -1,
        duration: 2,
        stagger: .2
    })
     .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
}

function custommouse(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
    })
}

custommouse()
circle()
firstpageAnim()
document.querySelectorAll(".elem").forEach(function (elem){
    elem.addEventListener("mouseleave", function(dets){
        gsap.to(elem.querySelector("img"),{
          opacity: 0,
          ease: Power3,
          duration: 0.5
        })
    })
})
document.querySelectorAll(".elem").forEach(function (elem){
    let rotate = 0
    let diffrot = 0
    elem.addEventListener("mousemove", function(dets){
       let diff = dets.clientY - elem.getBoundingClientRect()
       diffrot = dets.clientX - rotate
       rotate = dets.clientX
        gsap.to(elem.querySelector("img"),{
          opacity: 1,
          ease: Power3,
          top: diff,
          left: dets.clientX,
          rotate: gsap.utils.clamp(-20, 20, diffrot * 0.8)
        })
    })
})