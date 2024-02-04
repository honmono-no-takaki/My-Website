//Based on https://codepen.io/zuraizm/pen/vGDHl pen by zuraiz
jQuery(document).ready(function ($) {
  
    startSlider($('#slider'), 30); // Slide container ID, SlideShow interval 
  
    function startSlider(obj, timer) {
      
        var obj, timer;
        var id = "#"+obj.attr("id");
        var slideCount = obj.find('ul li').length;
        slideWidth = obj.attr("data-width");
        var sliderUlWidth = (slideCount+1) * slideWidth;
        var time = 2;
        var $bar,
        
        isPause,
        tick,
        percentTime;
        isPause = false; //false for auto slideshow

        $bar = obj.find('.progress .bar');

        function startProgressbar() {
            resetProgressbar();
            percentTime = 0;    
            tick = setInterval(interval, timer);
        }

        function interval() {
            if (isPause === false) {
              percentTime += 1 / (time + 0.1);
              $bar.css({
                width: percentTime + "%"
              });
              if (percentTime >= 100) {
                moveRight();
                startProgressbar();
              }
            }
        }

        function resetProgressbar() {
            $bar.css({
              width: 0 + '%'
            });
            clearTimeout(tick);
        }
  
        function startslide() {

            $(id+' ul li:last-child').prependTo(id+' ul');        
            obj.find('ul').css({ width: sliderUlWidth+'vw', marginLeft: - slideWidth+'vw' });
            
            obj.find('ul li:last-child').appendTo(obj.attr('id')+' ul');

        }

        if (slideCount>1) {
            startslide();
            startProgressbar();
        }
        else { // hade navigation buttons for 1 slide only
             $(id+' button.control_prev').hide();
             $(id+' button.control_next').hide();
        }


        

        function moveLeft() {
           $(id+' ul').css( { transition: "1s",
                  transform:  "translateX(" + slideWidth + "vw)" 
            });

            setTimeout( function() { 
                
                $(id+' ul li:last-child').prependTo(id+' ul');
                $(id+' ul').css( { transition: "none",
                  transform:  "translateX(" + 0 + "vw)" 
                });

                $('li.actslide').prev().addClass('actslide').next().removeClass('actslide');
            }, 1000 );
          
        }

        function moveRight2() { // fix for only 2 slades
          $(id+' ul li:first-child').appendTo(id+' ul'); 
         
          
$(id+' ul').css( { transition: "none",                      transform:  "translateX(100vw)"}).delay(); 
          
          setTimeout( function() { 
                    
$(id+' ul').css( { transition: "1s",                      transform:  "translateX(0vw)" }); 

                    
                }, 100, setTimeout( function() { 
                    
                   
$(id+' ul').css( { transition: "none",                      transform:  "translateX(0vw)" }); 
$('li.actslide').next().addClass('actslide').prev().removeClass('actslide');
                    
                }, 1000 )  ); 
          
         
          
           
        }

        function moveRight() {
            if (slideCount>2) {
                  $(id+' ul').css( { transition: "1s",
                  transform:  "translateX(" + (-1)*slideWidth + "vw)" 
                });

                setTimeout( function() { 
                    
                    $(id+' ul li:first-child').appendTo(id+' ul');
                    $(id+' ul').css( { transition: "none",
                      transform:  "translateX(" + 0 + "vw)" 
                    });

                    $('li.actslide').next().addClass('actslide').prev().removeClass('actslide');
                }, 1000 );  
            }
            else {
                moveRight2();
            }          
        }

        $(id+' button.control_prev').click(function () {
            moveLeft();
            startProgressbar();
        });

        $(id+' button.control_next').click(function () {

              moveRight();

            startProgressbar();
        });

        $(id+' .progress').click(function() {
            if (isPause === false) {
                isPause = true;
            }
            else {
                isPause = false;
            }   
      });
  };
});   


/* about */
gsap.registerPlugin(ScrollTrigger);

const textElements = gsap.utils.toArray('.text');

textElements.forEach(text => {
  gsap.to(text, {
    backgroundSize: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: text,
      start: 'center 80%',
      end: 'center 20%',
      scrub: true,
    },
  });
});

window.sections = [...document.querySelectorAll('.section')];
window.lastScrollTop = window.pageYOffset;

document.body.style.background = window.sections[0].getAttribute('data-bg');

window.addEventListener('scroll', onScroll);

function onScroll() {
  const scrollTop = window.pageYOffset;
  
  const section = window.sections
    .map(section => {
      const el = section;
      const rect = el.getBoundingClientRect();
      return {el, rect};
    })
    .find(section => section.rect.bottom >= (window.innerHeight * 0.5));
    document.body.style.background = section.el.getAttribute('data-bg');
}



/* gallery section */
const gallery = document.querySelector('.gallery');
const track = document.querySelector('.gallery-track');
const cards = document.querySelectorAll('.card');
const easing = 0.05;
let startY = 0;
let endY = 0;
let raf;

const lerp = (start,end,t) => start * (1-t) + end * t;

function updateScroll() {
  startY = lerp(startY,endY,easing);
  gallery.style.height = `${track.clientHeight}px`;
  track.style.transform = `translateY(-${startY}px)`;
  activateParallax();
  raf = requestAnimationFrame(updateScroll);
  if (startY.toFixed(1) === window.scrollY.toFixed(1)) cancelAnimationFrame(raf);
}

function startScroll() {
  endY = window.scrollY; 
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(updateScroll);
}

function parallax(card) {
  const wrapper = card.querySelector('.card-image-wrapper');
  const diff = card.offsetHeight - wrapper.offsetHeight;
  const {top} = card.getBoundingClientRect();
  const progress = top / window.innerHeight;
  const yPos = diff * progress;
  wrapper.style.transform = `translateY(${yPos}px)`;
}

const activateParallax = () => cards.forEach(parallax);

function init() {
  activateParallax();
  startScroll();
}

window.addEventListener('load',updateScroll,false);
window.addEventListener('scroll',init,false);
window.addEventListener('resize',updateScroll,false);




/*animated header text*/
var line = $('.line');

var tl = new TimelineLite({
			onComplete: function(){
				tl.restart();
			}
		});

 
TweenLite.defaultEase = Circ.easeInOut;

var time = 0.9;
var y = 100;

tl
	.add ( TweenMax.staggerFromTo (
		line, time,
			{
				opacity: 0,
				y:y,
			},
			{	
				opacity: 1,
				y: 0,
			},
		2 ))
	.add ( TweenMax.staggerTo (
		line, time,
			{
				delay: time,
				opacity: 0,
				y: -y,
			},
		2 ), 1.3)



    /* header*/
    const splitText = (selector) => {
      const elem = document.querySelector(selector);
      const text = elem.innerText;
      const chars = text.split("");
      const charsContainer = document.createElement("div");
      const charsArray = [];
    
      charsContainer.style.position = "relative";
      charsContainer.style.display = "inline-block";
    
      chars.forEach((char) => {
        const charContainer = document.createElement("div");
    
        charContainer.style.position = "relative";
        charContainer.style.display = "inline-block";
        charContainer.innerText = char;
        charsContainer.appendChild(charContainer);
    
        charsArray.push(charContainer);
      });
      // remove current text
      elem.innerHTML = "";
      // append new structure
      elem.appendChild(charsContainer);
    
      return charsArray;
    };
    
    const animate = function (text) {
      const chars = splitText(".head");
      return gsap.from(chars, {
        duration: 0.2,
        y: 100,
        opacity: 0,
        stagger: 0.1,
        delay: 1
      });
    };
    
    animate(".head");
    
    
