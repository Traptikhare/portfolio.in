 //        $(document).ready(function() {

//   //sticky header
//     $(window).scroll(function() {
//       if ($(this).scrollTop() > 1) {
//         $(".header-area").addClass("sticky");
//       } else {
//         $(".header-area").removeClass("sticky");
//       }
  
//       // Update the active section in the header
//       updateActiveSection();
//     });
  
//     $(".header ul li a").click(function(e) {
//       e.preventDefault(); 
  
//       var target = $(this).attr("href");
  
//       if ($(target).hasClass("active-section")) {
//         return; 
//       }
  
//       if (target === "#home") {
//         $("html, body").animate(
//           {
//             scrollTop: 0 
//           },
//           500
//         );
//       } else {
//         var offset = $(target).offset().top - 40; 
  
//         $("html, body").animate(
//           {
//             scrollTop: offset
//           },
//           500
//         );
//       }
  
//       $(".header ul li a").removeClass("active");
//       $(this).addClass("active");
//     });
  

//     //Initial content revealing js
//     ScrollReveal({
//       distance: "100px",
//       duration: 2000,
//       delay: 200
//     });
  
//     ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
//       origin: "left"
//     });
//     ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
//       origin: "right"
//     });
//     ScrollReveal().reveal(".project-title, .contact-title", {
//       origin: "top"
//     });
//     ScrollReveal().reveal(".projects, .contact", {
//       origin: "bottom"
//     });

//   //contact form to excel sheet
//   const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
//   const form = document.forms['submitToGoogleSheet']
//   const msg = document.getElementById("msg")

//   form.addEventListener('submit', e => {
//       e.preventDefault()
//       fetch(scriptURL, { method: 'POST', body: new FormData(form) })
//           .then(response => {
//               msg.innerHTML = "Message sent successfully"
//               setTimeout(function () {
//                   msg.innerHTML = ""
//               }, 5000)
//               form.reset()
//           })
//           .catch(error => console.error('Error!', error.message))
//   })
    
//   });
  
//   function updateActiveSection() {
//     var scrollPosition = $(window).scrollTop();
  
//     // Checking if scroll position is at the top of the page
//     if (scrollPosition === 0) {
//       $(".header ul li a").removeClass("active");
//       $(".header ul li a[href='#home']").addClass("active");
//       return;
//     }
  
//     // Iterate through each section and update the active class in the header
//     $("section").each(function() {
//       var target = $(this).attr("id");
//       var offset = $(this).offset().top;
//       var height = $(this).outerHeight();
  
//       if (
//         scrollPosition >= offset - 40 &&
//         scrollPosition < offset + height - 40
//       ) {
//         $(".header ul li a").removeClass("active");
//         $(".header ul li a[href='#" + target + "']").addClass("active");
//       }
//     });
//   }
  
//   $(document).ready(function(){
//     $('#menu_icon').click(function(){
//         $('#drawer').css('width', '250px');
//     });
    
//     $('.header-area').click(function(){
//         $('#drawer').css('width', '0');
//     });

//     $(window).resize(function(){
//         if ($(window).width() > 767) {
//             $('#drawer').css('width', '0');
//         }
//     });
// });


$(document).ready(function() {
  // Sticky header
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
    updateActiveSection();
  });

  // Smooth scrolling
  $(".header ul li a").click(function(e) {
    e.preventDefault();
    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) return;

    var offset = target === "#home" ? 0 : $(target).offset().top - 40;

    $("html, body").animate({ scrollTop: offset }, 500);
    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // ScrollReveal animations
  ScrollReveal({ distance: "100px", duration: 2000, delay: 200 });
  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", { origin: "right" });
  ScrollReveal().reveal(".project-title, .contact-title", { origin: "top" });
  ScrollReveal().reveal(".projects, .contact", { origin: "bottom" });

  // Mobile menu
  $('#menu_icon').click(function(e){
    e.stopPropagation();
    $('#drawer').toggleClass('open');
  });

  $(document).click(function(e){
    if (!$(e.target).closest('#drawer, #menu_icon').length) {
      $('#drawer').removeClass('open');
    }
  });

  $(window).resize(function(){
    if ($(window).width() > 767) {
      $('#drawer').removeClass('open');
    }
  });
});

// Active section highlighting
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  $("section").each(function() {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}



// Contact form submission

  function SendMail() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const msgElement = document.getElementById("msg");

    const params = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    };
    // Try sending to local backend first (recommended). If it fails, fall back to EmailJS.
    const backendUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? `${window.location.protocol}//${window.location.hostname}:${window.location.port || 3000}/api/contact`
      : `/api/contact`;

    fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    }).then(resp => {
      if (!resp.ok) throw new Error('Backend returned ' + resp.status);
      return resp.json();
    }).then(() => {
      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
      msgElement.innerHTML = "Message sent successfully (backend)!";
      msgElement.style.display = "block";
      setTimeout(() => { msgElement.style.display = "none"; }, 5000);
    }).catch((err) => {
      console.warn('Backend contact failed, falling back to EmailJS:', err);
      // fallback to EmailJS (existing behavior)
      emailjs.send("service_sv6124", "template_gonvlm5", params)
        .then(() => {
          nameInput.value = "";
          emailInput.value = "";
          messageInput.value = "";
          msgElement.innerHTML = "Email sent successfully!";
          msgElement.style.display = "block";
          setTimeout(() => { msgElement.style.display = "none"; }, 5000);
        })
        .catch((error) => {
          console.error("Email sending failed:", error);
          msgElement.innerHTML = "Failed to send message. Please try again.";
          msgElement.style.display = "block";
          setTimeout(() => { msgElement.style.display = "none"; }, 5000);
        });
    });
  }
//copyright footer 
  document.getElementById("year").textContent = new Date().getFullYear();


  $(document).ready(function(){
    $('#menu_icon').click(function(){
        var drawer = $('#drawer');
        if (drawer.width() === 0) {
            drawer.css('width', '250px');
        } else {
            drawer.css('width', '0');
        }
    });

    $('.header-area').click(function(){
        $('#drawer').css('width', '0');
    });

    $(window).resize(function(){
        if ($(window).width() > 767) {
            $('#drawer').css('width', '0');
        }
    });
});

  // Ambassadors accordion behavior
  $(function(){
    $('.amb-header').on('click', function(e){
      // prevent toggle when clicking an internal link/button
      const $target = $(e.target);
      if ($target.is('a') || $target.hasClass('offer-btn')) return;

      const $item = $(this).closest('.amb-item');
      const isOpen = $item.hasClass('open');

      // close others
      $('.amb-item.open').not($item).removeClass('open').find('.amb-header').attr('aria-expanded','false');

      // toggle this
      $item.toggleClass('open', !isOpen);
      $(this).attr('aria-expanded', String(!isOpen));
    });

    // Offer button fallback check
    $('.offer-btn').on('click', function(e){
      const href = $(this).data('href');
      // quick existence check via XMLHttpRequest HEAD (may be blocked by file://); if missing, alert
      if (!href) {
        e.preventDefault();
        alert('No offer file linked. Please add the PDF to the files/ folder and update the link.');
        return;
      }

      // Try a quick fetch to check file exists (works on http(s), may fail on local file system)
      fetch(href, { method: 'HEAD' }).then(resp => {
        if (!resp.ok) {
          e.preventDefault();
          alert('Offer file not found (HTTP ' + resp.status + '). Add the file to files/ or update the link.');
        }
      }).catch(() => {
        // ignore fetch errors (likely local file access); allow default download behavior
      });
    });
  });

  // Achievements view toggle (grid / compact)
  $(function() {
    var $achCont = $('.achievements-content');
    var $buttons = $('.ach-view-toggle .view-btn');

    function setView(view) {
      $achCont.removeClass('view-grid view-compact').addClass('view-' + view);
      $buttons.attr('aria-pressed', 'false');
      $buttons.filter('[data-view="' + view + '"]').attr('aria-pressed', 'true');
      try { localStorage.setItem('achievementsView', view); } catch(e) {}
    }

    // Init from storage (default compact)
    var saved = null;
    try { saved = localStorage.getItem('achievementsView'); } catch(e) {}
    setView(saved === 'grid' ? 'grid' : 'compact');

    $buttons.on('click', function() {
      var v = $(this).attr('data-view');
      setView(v);
    });
  });

  // Open all offers button
  $(function(){
    $('#open-all-offers').on('click', function(){
      var anchors = $('.offer-btn').toArray().map(function(a){ return a.getAttribute('href'); }).filter(Boolean);
      if (!anchors.length) {
        alert('No offer files found. Add PDFs to the files/ folder and update the links.');
        return;
      }

      // Open each link in a new tab with a small delay to reduce popup blocking
      anchors.forEach(function(href, i){
        setTimeout(function(){ window.open(href, '_blank', 'noopener'); }, i * 200);
      });
    });
  });

  // Robust Achievements controls: ensure toggle exists and use delegated handlers
  $(document).ready(function(){
    var $ach = $('.achievements-content');
    if (!$ach.length) {
      console.log('Achievements section not found on page.');
      return;
    }

    // Create ach-view-toggle if missing
    if (!$ach.find('.ach-view-toggle').length) {
      var $toggleHtml = $('<div class="ach-view-toggle" aria-hidden="false">'
        + '<button class="view-btn" data-view="grid" aria-pressed="false">Grid</button>'
        + '<button class="view-btn" data-view="compact" aria-pressed="true">Compact</button>'
        + '<button id="open-all-offers" class="open-all">Open all offers</button>'
        + '</div>');
      $ach.find('.ambassadors').prepend($toggleHtml);
      console.log('Created missing ach-view-toggle UI');
    }

    function setView(view) {
      $ach.removeClass('view-grid view-compact').addClass('view-' + view);
      $('.ach-view-toggle .view-btn').attr('aria-pressed', 'false');
      $('.ach-view-toggle .view-btn[data-view="' + view + '"]').attr('aria-pressed', 'true');
      try { localStorage.setItem('achievementsView', view); } catch(e) {}
      console.log('Achievements view set to', view);
    }

    // Init
    var saved = null;
    try { saved = localStorage.getItem('achievementsView'); } catch(e) {}
    setView(saved === 'grid' ? 'grid' : 'compact');

    // Delegated handlers
    $(document).on('click', '.ach-view-toggle .view-btn', function(e){
      var v = $(this).attr('data-view');
      setView(v);
    });

    $(document).on('click', '#open-all-offers', function(){
      var anchors = $('.offer-btn').toArray().map(function(a){ return a.getAttribute('href'); }).filter(Boolean);
      if (!anchors.length) {
        alert('No offer files found. Add PDFs to the files/ folder and update the links.');
        return;
      }
      anchors.forEach(function(href, i){ setTimeout(function(){ window.open(href, '_blank', 'noopener'); }, i * 200); });
    });
  });

