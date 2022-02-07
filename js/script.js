document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".header__tabs-btn").forEach(item => {
    item.addEventListener("click", function () {
      let btn = this;
      let dropdown = this.parentElement.querySelector(".header__sp");

      document.querySelectorAll(".header__tabs-btn").forEach(el => {
        if (el != btn) {
          el.classList.remove("header__tabs-btn-active");
        }
      });

      document.querySelectorAll(".header__sp").forEach(el => {
        if (el != dropdown) {
          el.classList.remove("header__sp-active");
        }
      })
      dropdown.classList.toggle("header__sp-active");
      btn.classList.toggle("header__tabs-btn-active")
    });
  });

  document.addEventListener("click", function (e) {
    let target = e.target;
    if (!target.closest(".header__ul-styles")) {
      document.querySelectorAll(".header__sp").forEach(el => {
        el.classList.remove("header__sp-active");
      })
      document.querySelectorAll(".header__tabs-btn").forEach(el => {
        el.classList.remove("header__tabs-btn-active");
      });
    }
  });

  document.querySelectorAll(".header__sp-ul").forEach(a => {
    new SimpleBar(a, {
      autoHide: false,
      scrollbarMaxSize: 28,
    })
  });

  new SimpleBar(document.querySelector(".header__burger-nav-ul"), {
    /* чтобы изначально ползунок был виден */
    autoHide: false,
    /* с помощью этого значения вы можете управлять высотой ползунка*/
    scrollbarMaxSize: 25,
  });

  const swiper = new Swiper('.header__hero-swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 2000,
    autoplay: {
      delay: 8000
    },
    effect: "fade",
    allowTouchMove: false,
  });

  document.querySelector('.header__btn-burger').addEventListener('click', function () {
    document.querySelector('.header__burger-menu').classList.toggle('header__burger-menu-active')
  });

  document.querySelector('.header__burger-menu-btn-close').addEventListener('click', function () {
    document.querySelector('.header__burger-menu').classList.toggle('header__burger-menu-active')
  });

  //
  document.querySelector(".header__btn-search-adaptiv").addEventListener("click", function () {
    document.querySelector(".header__form-search").classList.add("header__form-search-active");
    this.classList.add("active");
  });

  document.addEventListener("click", function (e) {
    let target = e.target;
    let form = document.querySelector(".header__form-search");
    if (!target.closest(".header__div-top")) {
      form.classList.remove("header__form-search-active");
      form.querySelector("input").value = "";
      document.querySelector(".header__btn-search-adaptiv").classList.remove("active")
    }
  });

  document.querySelector('.header__form-x').addEventListener('click', function () {
    document.querySelector('.header__form-search').classList.toggle('header__form-search-active');
    document.querySelector(".header__btn-search-adaptiv").classList.remove("active");
  });

  // select
  const element = document.querySelector('.gallery__select');
  const choices = new Choices(element, {
    searchEnabled: false,
    shouldSort: false
  });

  // gallery
  let gallerySlider = new Swiper(".gallery__swiper", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    grid: {
      rows: 1
    },
    spaceBetween: 1,
    pagination: {
      el: ".gallery__swiper-pagination-right",
      type: "fraction"
    },
    navigation: {
      nextEl: ".gallery__swiper-btn-next",
      prevEl: ".gallery__swiper-btn-prev"
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        grid: {
          rows: 1
        },
        spaceBetween: 0
      },
      576: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: {
          rows: 2
        },
        spaceBetween: 34
      },

      1200: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          rows: 2
        },
        spaceBetween: 50
      }
    },

    a11y: {
      prevSlideMessage: 'Предыдущий блок',
      nextSlideMessage: 'Следующий блок',
    }
  });

  // аккордион

  $(function () {
    $(".accordion").accordion({
      collapsible: true,
      active: 0,
      heightStyle: "content"
    });
  });

  // табы

  function tabsActive(tabPath, tabTarget) {
    document.querySelectorAll(tabPath).forEach(item => {
      item.addEventListener("click", function (e) {
        let path = e.currentTarget.dataset.path;
        document.querySelectorAll(tabTarget).forEach(el => {
          el.classList.remove('catalog__opacity')
          setTimeout(() => { el.classList.remove("catalog__active") }, 200);
        })
        document.querySelectorAll(tabPath).forEach(el => {
          el.classList.remove("catalog__active");
        })
        setTimeout(() => { document.querySelector(`[data-target="${path}"]`).classList.add("catalog__active"); }, 200);
        setTimeout(() => { document.querySelector(`[data-target="${path}"]`).classList.add("catalog__opacity"); }, 230);

        if (tabPath === ".catalog__li-artist") {
          if (window.innerWidth <= 767) {
            setTimeout(() => { document.location.href = `#${document.querySelector(`[data-target="${path}"]`).id}`; }, 270)
          }
        }

        this.classList.add("catalog__active");
      })
    })
  };
  tabsActive(".catalog__li", ".catalog__div-general");
  tabsActive(".catalog__li-artist", ".catalog__div-left");

  // events
  // btn events
  document.getElementById('events__btn').addEventListener('click', () => {
    document.querySelectorAll('.events__carts').forEach(b => {
      b.classList.add('events__carts-active');
    });
    document.querySelector('.events__div-btn').remove();
  });

  // slider
  const slider = document.querySelector('.events__swipper-container');
  let eventsSwiper;

  function mobileSwiper() {
    if (window.innerWidth <= 575 && slider.dataset.mobile == 'false') {
      eventsSwiper = new Swiper(slider, {
        slidesPerView: 1,
        loop: false,
        pagination: {
          el: '.events__pagination',
          clickable: true,
        },
      });
      slider.dataset.mobile = 'true';
    }

    if (window.innerWidth > 575) {
      slider.dataset.mobile = 'false';
      if (slider.classList.contains('swiper-initialized')) {
        eventsSwiper.destroy();
      }
    }
  };

  mobileSwiper();

  // editions
  let btn = document.querySelector(".editions__h5");
  let checklist = document.querySelector(".editions__checkbox-list");
  btn.addEventListener("click", function () {
    btn.classList.toggle("editions__h5-active");
    checklist.classList.toggle("editions__checkbox-list-active");
    document.querySelectorAll(".editions__checkbox-label").forEach(el => {
      el.classList.toggle("active");
      let checkbox = el.querySelector(".editions__checkbox");
      if (checkbox.checked) {
        el.classList.add("active");
      }
    })
  });

  document.querySelectorAll(".editions__checkbox-label").forEach(el => {
    el.addEventListener("click", function () {
      let label = this;
      if (!checklist.classList.contains("editions__checkbox-list-active")) {
        label.classList.remove("active");
      }
    });
  })

  const editionsSliderCreate = document.querySelector('.editions__right-swiper');
  let editionsSlider;

  function desctopSlider() {
    if (window.innerWidth > 575 && editionsSliderCreate.dataset.mobile == 'false') {
      editionsSlider = new Swiper(editionsSliderCreate, {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        pagination: {
          el: ".editions__swiper-pagination-right",
          type: "fraction"
        },
        navigation: {
          nextEl: ".editions__swiper-btn-next",
          prevEl: ".editions__swiper-btn-prev"
        },

        breakpoints: {
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0
          },
          576: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 34
          },
          1023: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 49
          },
          1200: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50
          }
        },

        a11y: {
          prevSlideMessage: 'Предыдущий блок',
          nextSlideMessage: 'Следующий блок',
        }
      });
      editionsSliderCreate.dataset.mobile = 'true';
    }

    if (window.innerWidth <= 575) {
      editionsSliderCreate.dataset.mobile = 'false';
      if (editionsSliderCreate.classList.contains('swiper-initialized')) {
        editionsSlider.destroy();
      }
    }
  };

  desctopSlider();

  window.addEventListener('resize', () => {
    mobileSwiper();
    desctopSlider();
  })

  // projects
  tippy('#tolltip-1', {
    content: '<p class="projects__tippy">Пример современных тенденций - современная&nbsp;методология&nbsp;разработки</p>',
    theme: 'purple',
    trigger: 'focus',
    allowHTML: true,
    animation: 'scale',
  });

  tippy('#tolltip-2', {
    content: '<p class="projects__tippy">Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции</p>',
    theme: 'purple',
    trigger: 'focus',
    allowHTML: true,
    animation: 'scale',
  });

  tippy('#tolltip-3', {
    // content: "В стремлении повысить качество ",
    content: '<p class="projects__tippy">В стремлении повысить качество</p>',
    theme: 'purple',
    trigger: 'focus',
    allowHTML: true,
    animation: 'scale',
  });

  let projectsSlider = new Swiper(".projects__swiper", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: ".projects__btn-right",
      prevEl: ".projects__btn-left"
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0
      },
      576: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34
      },
      1023: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 50
      },
      1200: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      }
    },
  });

  // Маска
  let selector = document.querySelector("input[type='tel']");
  let im = new Inputmask("+99999999999[9]");
  im.mask(selector);

  // Валидация формы
  new JustValidate('.contacts__form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 33,
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length >= 10
        }
      },
    },
    colorWrong: '#D11616',
    messages: {
      name: {
        required: 'Как вас зовут?',
        minLength: 'Введите минимум 2 символа',
        maxLength: 'Не более 33 символов',
      },
      tel: {
        required: 'Укажите ваш номер',
        function: 'Введите полный номер'
      },
    }
  });

  // cart
  let x;
  let y;

  if (window.innerWidth > 1200) {
    x = 55.762;
    y = 37.637399;
  };

  if (window.innerWidth <= 1200 && window.innerWidth > 1023) {
    x = 55.759416;
    y = 37.616746;
  };

  if (window.innerWidth <= 1023 && window.innerWidth > 767) {
    x = 55.757852;
    y = 37.609113;
  };

  if (window.innerWidth <= 767) {
    x = 55.759734;
    y = 37.611155;
  }

  ymaps.ready(init);
  function init() {
    // Создание карты.
    let myMap = new ymaps.Map("map", {
      center: [x, y],
      zoom: 14,
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1400) {
        myMap.panTo([55.759277, 37.637399])
      };
      if (window.innerWidth <= 1400 && window.innerWidth > 1200) {
        myMap.panTo([55.75925, 37.61675])
      };
      if (window.innerWidth <= 1200 && window.innerWidth > 1023) {
        myMap.panTo([55.759416, 37.616746])
      };
      if (window.innerWidth <= 1023 && window.innerWidth > 767) {
        myMap.panTo([55.757852, 37.609113])
      }
      if (window.innerWidth <= 767) {
        myMap.panTo([55.759734, 37.611155])
      }
    })
    let myCircle = new ymaps.Circle([[55.758468, 37.601088], 50], {}, {
      fill: true,
      fillColor: "#9D5CD0",
      strokeColor: "#9D5CD0",
    });
    myMap.geoObjects.add(myCircle);
    myMap.controls.remove('zoomControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('routeButton');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('typeSelector');
    let geolocationControl = new ymaps.control.GeolocationControl({
      options: {
        size: 'large',
        maxWidth: "40px",
        position: {
          right: "8px",
          top: "340px"
        }
      }
    });
    let zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: 'medium',
        position: {
          right: "8px",
          top: "260px"
        }
      }
    });
    if (window.innerWidth > 1200) {
      myMap.controls.add(geolocationControl);
      myMap.controls.add(zoomControl);
    };
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1200) {
        myMap.controls.add(geolocationControl);
        myMap.controls.add(zoomControl);
      };
      if (window.innerWidth <= 1200) {
        myMap.controls.remove(geolocationControl);
        myMap.controls.remove(zoomControl);
      };
    })
  };

  const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    closeOnOverlay: false,
    closeOnEsc: false,
  });

  document.getElementById('myModal').addEventListener('click', () => {
    document.getElementsByTagName('html')[0].style.scrollBehavior="auto";
    setTimeout(() => { document.getElementsByTagName('html')[0].style.scrollBehavior="smooth"; }, 500);
  })

})


