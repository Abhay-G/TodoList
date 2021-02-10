//submiting on checkbox
// $('#chkform .item input[type="checkbox"]').change(function() {
//   $('#chkform').submit();
// });

//cpyright animation
var copyright = document.querySelector(".cpyright");
copyright.addEventListener("mouseenter", function() {
  copyright.innerText = "© Abhay";
})
copyright.addEventListener("mouseleave", function() {
  copyright.innerHTML = "© EGGZY";
})

//hover animation
document.querySelector('.addbtn').addEventListener("mouseenter", function() {
  var t = gsap.timeline();
  t.to('.addbtn', {
    duration: 0.3,
    scale: 1.2,
    ease: 'Expo.easeInOut',

  })
})

document.querySelector('.addbtn').addEventListener("mouseleave", function() {
  var t = gsap.timeline();
  t.to('.addbtn', {
    duration: 0.3,
    scale: 1,
    ease: 'Expo.easeInOut',

  })

})


//all other gsap animation
// var t1 = gsap.timeline();
//
// t1.from('#heading', {
//   duration: 1.5,
//   y: 40,
//   ease: 'Expo.easeInOut',
//   opacity: 0
// })
// t1.from('.rest', {
//   duration: 1,
//   y: 60,
//   ease: 'Expo.easeInOut',
//   opacity: 0
// }, '-=1')
// t1.from('button', {
//   duration: 0.8,
//   scale: 5,
//   ease: 'Expo.easeInOut',
//   opacity: 0
// }, '-=0.5')
// t1.from('.footer', {
//   duration: 2,
//   opacity: 0
// }, '-=0.5')


$('#heading h1').textillate({
  initialDelay: 0.5,
  in: {
    effect: "fadeIn",
    delayScale: 2
  }
});
