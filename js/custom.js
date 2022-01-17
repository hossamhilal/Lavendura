/*global $ */
(function($) {
    "use strict";

    // $(window).on('load', function(){
    //     $('body').addClass('stopScroll');
    //     $('.loader').fadeOut(500, function () {
    //         $(this).remove();
    //         $('body').removeClass('stopScroll');
    //     }); 
    // });

    // // OPEN SIDE  MENU 
    // $('.menuBtn').on('click', function(){
    //     $('.navMenu').toggleClass('show');
    //     $('.navOverlay').addClass('show');  
    //     setTimeout(function(){
    //         $('body').addClass('stopScroll');
    //     }, 200); 
    // });

    // CLOSE SIDE MENU 
    // $('.navOverlay').on('click', function(){
    //     $(this).removeClass('show');
    //     $('.navMenu').removeClass('show');  
    //     $('body').removeClass('stopScroll');  
    // });

    // //  Open DropDown
    // $('.dropToggle').on('click', function(e){
    //     e.preventDefault();
    //     e.stopPropagation();
    //     if($(this).next('.dropDown').hasClass('open')){
    //         $('.dropDown').removeClass('open');
    //     } else {
    //         $('.dropDown').removeClass('open');
    //         $(this).next('.dropDown').toggleClass('open');
    //     } 
    // });

    //  Close DropDown
    // $(document).on('click', function(){
    //     $('.dropDown').removeClass('open');
    // });

    
    // Check if Rtl 
    var rtlVal = true ;   
    $('body').hasClass('en') ? rtlVal = false : rtlVal = true;

    // Header OWL 
    $('.owlHome').owlCarousel({
        rtl: rtlVal ,
        margin: 0,
        autoplay: true,
        loop: true,
        nav: true,
        dots: true,
        autoplaySpeed : 5000,
        autoplayTimeout : 5000,
        smartSpeed: 5000 ,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ["<i class='icofont-thin-right'></i>", "<i class='icofont-thin-left'></i>"],
        responsive: {
            0: {
                items: 1,
                dotsEach: 1
            },
            600: {
                items: 1,
                dotsEach: 1
            },
            1000: {
                items: 1,
                dotsEach: 1
            }
        }
    });

    // Testimonials OWL 
    $('.owlProducts').owlCarousel({
        rtl: rtlVal ,
        margin: 20,
        autoplay: true,
        loop: false,
        nav: true,
        dots: false,
        center : false ,
        autoplaySpeed : 5000,
        autoplayTimeout : 5000,
        smartSpeed: 5000 ,
        navText: ["<i class='icofont-thin-right'></i>", "<i class='icofont-thin-left'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });

    // Partners OWL 
    // $('.owlPartners').owlCarousel({
        // rtl: rtlVal ,
    //     margin: 20,
    //     autoplay: true,
    //     loop: true,
    //     nav: false,
    //     dots: false,
    //     center : false ,
    //     autoplaySpeed : 5000,
    //     autoplayTimeout : 5000,
    //     smartSpeed: 5000 ,
    //     navText: ["<i class='icofont-thin-right'></i>", "<i class='icofont-thin-left'></i>"],
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         600: {
    //             items: 3
    //         },
    //         1000: {
    //             items: 4
    //         }
    //     }
    // });

    // Clients OWL 
    // $('.owlClients').owlCarousel({
    //     margin: 20,
    //     autoplay: true,
    //     loop: true,
    //     nav: true,
    //     dots: false,
    //     center : false ,
    //     autoplaySpeed : 5000,
    //     autoplayTimeout : 5000,
    //     smartSpeed: 5000 ,
    //     navText: ["<i class='icofont-thin-right'></i>", "<i class='icofont-thin-left'></i>"],
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         600: {
    //             items: 3
    //         },
    //         1000: {
    //             items: 4
    //         }
    //     }
    // });


    // // Upload File 
    // $('.uploadFile').on('change', function(e) {
    //     let fileName = e.target.value.split( '\\' ).pop();
    //     console.log(fileName);
    //     let files = $(this).parent('.uploadBox').prev('.uploadedFiles');
    //     files.append(
    //         '<div class="file">' +
    //             '<h3 class="fileName">' + fileName  + '</h3>' +
    //             '<span class="deleteFile"> <i class="icofont-ui-delete"></i> </span>' +
    //         '</div>'
    //     );               
    // });

    // // Delete File
    // $(document).on('click','.deleteFile' , function(){
    //     $(this).parent('.file').remove();
    // });


    // Custom Select
    window.addEventListener('load', (event) => {
        let Index = 0 ;
        $('select').each(function () {
            let This = $(this),
                Options = $(this).children('option').length;
                
            // Loop In All Select
            Index ++;

            // Hide Select 
            This.addClass('d-none');

            // Create Parent CusotomSelect
            This.wrap('<div class="customSelect"></div>');

            // Create Selected Box
            This.after('<div class="selected"></div>');

            // Selected Preview Box
            let selected =This.next('.selected');

            // Create Dropdown
            let DropDown = $('<div />', {
                'class': 'selectList'
            }).insertAfter(selected);

            // Create Option List 
            let List = $('<ul />', {
                'class': 'list'
            }).appendTo(DropDown);

            // Close Other Lists Expect Current List 
            selected.click(function (e) {
                e.stopPropagation();
                $('.selected.active').not(this).each(function () {
                    $(this).removeClass('active').next('.selectList').slideUp();
                });
                $(this).toggleClass('active').next('.selectList').slideToggle();
            });

            // close dropdown 
            $(document).click(function () {
                selected.removeClass('active');
                DropDown.hide();
            });

            // Default Select
            if($(this).is('[default]')) {

                // Display First Option In Selected Box  
                selected.text(This.children('option').eq(0).text());

                // Loop on items 
                for (let i = 0; i < Options; i++) {
                    $('<li />', {
                        text:This.children('option').eq(i).text(),
                        value:This.children('option').eq(i).val()
                    }).appendTo(List);
                }

                // Get Selected Items 
                let item = List.children('li');

                // Item Click
                item.click(function (e) {
                    e.stopPropagation();

                    // Append Selected Elements
                    selected.text($(this).text()).removeClass('active');

                    // Toggle otionSelected Class 
                    $(item).removeClass('optionSelected');
                    $(this).addClass('optionSelected');

                    // Pass Value To Select 
                    This.val($(this).attr('value'));

                    // close dropdown 
                    DropDown.hide();
                });
            }
        });
    });

    

    // iniat WOW Js
    new WOW().init();
   
})(jQuery);

