jQuery(document).ready(function($) {
    "use strict";

    var TOptions;

    TOptions = {

        class_active: "active",
        class_trigger: "trigger",
        toggle_btn: $(".site-nav-toggle"),
        navigation: $(".site-nav"),
        sub_menu: ".sub-menu",
        indicator_mobile: ".indicator-mobile",
        sticky_header: "#sticky-header",
        sticky_wrapper: ".sticky-wrapper",
        pre_loader: $(".site-preloader"),
        windows: $(window),
        selector_slider: document.getElementById("sequence"),
        selector_counter: $(".counter"),
        selector_tab: $("#site-tabs-1"),
        tabs_button: $(".site-tabs-buttons"),
        site_tabs: $(".site-tabs"),
        tabs_bg: $(".site-tab-bg"),
        portfolio: $(".site-portfolio-tabs-content"),
        portfolio_tabs: $(".site-portfolio-tabs"),
        light_box: $(".venobox"),
        selector_team: $("#team-section-slider"),
        team_thumbs: $("#team-thumbnails"),
        selector_testimonial: $("#testimonial-slider"),
        contact_form: $("#contactForm"),

        preloader_show: function(self) {
            self = this;
            if (self.pre_loader.length === 1) {
                self.windows.on("load", function() {
                    self.pre_loader.fadeOut(400);
                });
            }
        },
        header_section: function(self, animate_speed) {
            animate_speed = 400;
            self = this;
            self.toggle_btn.on("click", function(event) {
                event.preventDefault();
                if (!$(this).hasClass(self.class_active)) {
                    $(this).addClass(self.class_active);
                    self.navigation.stop(true, true).slideDown(animate_speed);

                } else {
                    $(this).removeClass(self.class_active);
                    self.navigation.stop(true, true).slideUp(animate_speed);
                }
            });
            self.navigation.find(self.indicator_mobile).on("click", function(subMenu) {
                subMenu = $(this).parent("li").children(self.sub_menu);
                if (subMenu.is(":hidden")) {
                    subMenu.stop(true, true).slideDown(animate_speed);
                } else {
                    subMenu.stop(true, true).slideUp(animate_speed);
                }
            });
        },
        sticky_header_menu: function() {
            $(this.sticky_header).sticky({
                topSpacing: 0,
                zIndex: 10000
            });
        },
        internal_scroll_links: function(self, scroll_speed) {
            scroll_speed = 1000;
            self = this;
            self.navigation.find("a[href^='#']").on("click", function(event, target, $target) {
                event.preventDefault();
                target = this.hash;
                $target = $(target);
                $("html, body").stop().animate({
                    "scrollTop": $target.offset().top
                }, scroll_speed);
            });
        },
        main_slider_section: function() {
            sequence(this.selector_slider, {
                keyNavigation: true,
                animateCanvas: false,
                phaseThreshold: false,
                fadeStepWhenSkipped: true,
                reverseWhenNavigatingBackwards: true,
                autoPlay: false,
                swipeNavigation: true,
                swipeEvents: {
                    left: function(sequence) {
                        sequence.prev();
                    },
                    right: function(sequence) {
                        sequence.next();
                    }
                }
            });
            jQuery(".player").mb_YTPlayer();
        },
        statistic_section: function() {
            this.selector_counter.countimator({});
        },
        tab_section: function(self) {
            self = this;
            self.selector_tab.tabslet({
                active: 1,
                animation: true
            });
            self.tabs_button.on("mouseup", "a", function(attribute, background) {
                attribute = $(this).attr("data-tab-bg");
                background = self.site_tabs.find("." + attribute + "");
                if (!background.hasClass(self.class_active)) {
                    self.tabs_bg.removeClass(self.class_active);
                    background.addClass(self.class_active);
                }
            });
        },
        portfolio_section: function(self, $grid) {
            self = this;
            $grid = self.portfolio.isotope({
                itemSelector: ".portfolio-items",
                layoutMode: "masonry"
            });
            self.light_box.venobox({});
            self.portfolio_tabs.on("click", "li", function(class_attr) {
                class_attr = $(this).attr("data-filter");
                $grid.isotope({
                    filter: "." + class_attr
                });
                $(this).siblings("li").removeClass(self.class_active);
                $(this).addClass(self.class_active);
            });
        },
        testimonial_section: function() {
            this.selector_testimonial.swiper({
                nextButton: "#testimonial-button-next",
                prevButton: "#testimonial-button-prev",
                speed: 1000,
                spaceBetween: 150,
                slidesPerView: 1,
                pagination: "#testimonial-pagination",
                paginationClickable: true,
                loop: true,
                autoplay: 3000,
                autoplayDisableOnInteraction: false,
                breakpoints: {
                    "991": {
                        slidesPerView: 1,
                        spaceBetweenSlides: 10
                    }
                }
            });
        },
        ajax_form_submit: function(formMessages, formIcon) {
            formMessages = this.contact_form.find("button[type=submit]");
            formIcon = formMessages.find("i");
            this.contact_form.on("submit", function(event, self) {
                event.preventDefault();
                self = $(this);
                formIcon.css("display", "inline-block");
                $.ajax({
                        type: "POST",
                        url: self.attr("action"),
                        data: self.serialize()
                    })
                    .done(function(response) {
                        $(formMessages).text(response);
                        self.find("input, textarea").val("");
                        formIcon.css("display", "none");
                    })
                    .fail(function(data) {
                        if (data.responseText !== "") {
                            $(formMessages).html("Error");
                        }
                        formIcon.css("display", "none");
                    });
            });
        },
        scroll_up: function() {
            $.scrollUp({
                scrollName: "ThemeScrollUp",
                scrollDistance: 300,
                scrollFrom: "top",
                scrollSpeed: 2000,
                easingType: "linear",
                animation: "fade",
                animationSpeed: 800,
                scrollText: "<span class='icon-slider-arrow-top'>",
                zIndex: 100000
            });
        }

    };
    TOptions.preloader_show();
    TOptions.header_section();
    TOptions.sticky_header_menu();
    TOptions.internal_scroll_links();
    TOptions.main_slider_section();
    TOptions.statistic_section();
    TOptions.tab_section();
    TOptions.portfolio_section();
    TOptions.ajax_form_submit();
    TOptions.scroll_up();
    $(window).on("load", function() {
        TOptions.testimonial_section();
    });
});