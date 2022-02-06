/*global $ */
(function ($) {
    "use strict";

    // Pre Loading 
    window.onpaint = preloadFunc();
    function preloadFunc() {
        $('body').addClass('stopScroll');
    }
    
    // Loader 
    $(window).on('load', function () { 
        setTimeout(function () {
            $('.loader').fadeOut(5000, function () {
                $('body').removeClass('stopScroll');
                $(this).remove();
                $('#cityModal').modal('show');
            }); 
        }, 10000);   
    });

    // OPEN SIDE  MENU 
    $('.menuBtn').on('click', function () {
        $('.headerBottom').toggleClass('show');
        $('.bodyOverlay').addClass('show');
        setTimeout(function () {
            $('body').addClass('stopScroll');
        }, 100);
    });

    // CLOSE SIDE MENU 
    $('.bodyOverlay').on('click', function () {
        $(this).removeClass('show');
        $('.headerBottom').removeClass('show');
        $('body').removeClass('stopScroll');
    });

    // Check if Rtl 
    var rtlVal = true;
    $('body').hasClass('en') ? rtlVal = false : rtlVal = true;

    // Header OWL 
    $('.owlHome').owlCarousel({
        rtl: rtlVal,
        margin: 0,
        autoplay: true,
        loop: true,
        nav: true,
        dots: true,
        autoplaySpeed: 5000,
        autoplayTimeout: 5000,
        smartSpeed: 5000,
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
        rtl: rtlVal,
        margin: 20,
        autoplay: true,
        loop: false,
        nav: true,
        dots: false,
        center: false,
        autoplaySpeed: 5000,
        autoplayTimeout: 5000,
        smartSpeed: 5000,
        navText: ["<i class='icofont-thin-right'></i>", "<i class='icofont-thin-left'></i>"],
        responsive: {
            0: {
                items: 1
            },
            425: {
                items: 2,
                margin: 0
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });

    // Thumbnails OWL 
    let owlThumbnails = $('.owlThumbnails');
    owlThumbnails.owlCarousel({
        rtl: rtlVal ,
        
        autoplay: false,
        loop: true,
        nav: false,
        dots: false,
        center : false ,
        autoplaySpeed : 1000,
        autoplayTimeout : 1000,
        smartSpeed: 1000 ,
        navText: ["<i class='icofont-thin-right'></i>", "<i class='icofont-thin-left'></i>"],
        responsive: {
            0: {
                items: 3,
                margin: 5
            },
            600: {
                items: 3,
                margin: 10
            },
            1000: {
                items: 4,
                margin: 15
            }
        }
    });

    // Preview Active Image in Ad Slider Thumbs 
    $('#activeSlid img').attr('src' , $('.owlThumbnails .owl-item.active.center img').attr('src'));

    owlThumbnails.on('changed.owl.carousel', function(e) {
        let ActiveSrc = $('.owlThumbnails .owl-item.active.center img').attr('src');
        $('#activeSlid img').attr('src', ActiveSrc);
    });

    $(document).on('click','.owlThumbnails .owl-prev , .owlThumbnails .owl-next', function(){
        let ActiveSrc = $('.owlThumbnails .owl-item.active.center img').attr('src');
        $('#activeSlid img').attr('src', ActiveSrc);
    });

    $(document).on('click','.owlThumbnails .item', function(){
        let ActiveSrc = $(this).find('img').attr('src');
        $('#activeSlid img').attr('src', ActiveSrc);
    });

    // Custom Select
    window.addEventListener('DOMContentLoaded', (event) => {
        let Index = 0;
        $('select').each(function () {
            let This = $(this),
                Options = $(this).children('option').length;

            // Loop In All Select
            Index++;

            // Hide Select 
            This.addClass('d-none');

            // Create Parent CusotomSelect
            This.wrap('<div class="customSelect"></div>');

            // Create Selected Box
            This.after('<div class="selected placeholder"></div>');

            // Selected Preview Box
            let selected = This.next('.selected');

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
            if ($(this).is('[default]')) {

                // Display First Option In Selected Box  
                selected.text(This.children('option').eq(0).text());

                // Loop on items 
                for (let i = 0; i < Options; i++) {
                    $('<li />', {
                        text: This.children('option').eq(i).text(),
                        value: This.children('option').eq(i).val()
                    }).appendTo(List);
                }

                // Get Selected Items 
                let item = List.children('li');

                // Item Click
                item.click(function (e) {
                    e.stopPropagation();
                    selected.removeClass('placeholder');

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

    // show Password 
    `$('.showPassword').on('click', function () {
        let input = $(this).prev();
        input.attr('type', input.attr('type') === 'password' ? 'text' : 'password');
    });`

    // Verification Code 
    const inputElements = [...document.querySelectorAll('input.codeInput')]
    inputElements.forEach((ele, index) => {
        ele.addEventListener('keydown', (e) => {
            if (e.keyCode === 8 && e.target.value === '') inputElements[Math.max(0, index - 1)].focus()
        })
        ele.addEventListener('input', (e) => {
            // take the first character of the input
            const [first, ...rest] = e.target.value
            e.target.value = first ?? '' // the `??` '' is for the backspace usecase
            const lastInputBox = index === inputElements.length - 1
            const insertedContent = first !== undefined
            if (insertedContent && !lastInputBox) {
                // continue to input the rest of the string
                inputElements[index + 1].focus()
                inputElements[index + 1].value = rest.join('')
                inputElements[index + 1].dispatchEvent(new Event('input'))
            }
        })
    })

    // submit form 
    // Get Values from all Inputes mapped on string
    $('.verificationForm').submit(function(e) {
        e.preventDefault();
        const code = [...document.querySelectorAll('input.codeInput')]
            .filter(({ name }) => name)
            .map(({ value }) => value)
            .join('')
        console.log(code);

        $('#statusModal').modal('show')
    });

    // rest Password Form 
    $('.restPasswordForm').submit(function(e) {
        e.preventDefault();
        $('#statusModal').modal('show')
    });

    // Showpackaging Types
    $('#showTypes').on('click', function (e){
        e.preventDefault();
        $('.packagingTypes').show();
    });

    // radio Checked
    $('.packagingType input').on('change', function (){
        if($(this).is(":checked")) {
            $('.packagingType').removeClass('checked');
            $(this).parent().addClass('checked');
        }
        else {
            $(this).parent().removeClass('checked');
        }
    });

    // rest Password Form 
    $('.giftForm').submit(function(e) {
        e.preventDefault();
        $('#statusModal').modal('show')
    });

    // Collpase 
    $('.colapseHead').on('click' , function(){
        $(this).parent('.colapse').toggleClass('open');
    });

    // View Btn [ filter How To Show Columns ]
    $('.viewBtn').on('click' , function(){
        $('.viewBtn').removeClass('active');
        $(this).addClass('active');

        // Show Products As A List 
        if($(this).hasClass('listBtn') ) {
            $('.product').addClass('listProduct');
            $('.product').parent().removeClass('col-6 col-sm-4 col-lg-4').addClass('col-12 col-sm-6 col-lg-6');
        }
        // Show Products As A Grid
        else if($(this).hasClass('GridBtn') ) {
            $('.product').removeClass('listProduct');
            $('.product').parent().removeClass('col-12 col-sm-6 col-lg-6').addClass('col-6 col-sm-4 col-lg-4');
        }
    });

    // add To Favourite 
    $('.addToFav').on('click' , function(){
        $(this).toggleClass('liked');
    });

    // Tabs
    $('.tabBtn').on('click' , function(e){
        e.preventDefault();

        $('.tabBtn').removeClass('active');
        $(this).addClass('active');
        
        let itemId = $(this).attr("href"); 
        $('.tab').removeClass('show'); 
        $(itemId).addClass('show');

        itemId == '#tab3' ? $('.commentsWrapper').slideDown() : $('.commentsWrapper').slideUp();
    });

    //  Count
    $('.countBtn').on('click' , function(e){
        e.preventDefault();
        let count = $(this).parent().find('.countNum') ,
            value = parseInt(count.val());
            
        if($(this).hasClass('plusBtn')){
            value = value + 1;
            count.val(value);
        }
        if($(this).hasClass('minusBtn') && value > 0 ){
            value = value - 1;
            count.val(value);
        }
    });

    // Rating 
    $('.ratingStars input').on('change', function (){
        let id = $(this).data('id');
        console.log( 'iD:::' , id)
        if($(this).is(":checked")) {
            $('.emoji-wrapper .emoji').css("transform", `translateY(-${id}00px)`);
        }
    });

    // Date Picker 
    $('.dateInput').datetimepicker({
        pickTime: false
    });

    //  Time Picker 
    $('.timeInput').datetimepicker({
        pickDate: false
    });

    // Visit radio Button
    $('.radio input').on('change', function (){
        if($(this).is(":checked")) {
            $('.radio').removeClass('checked');
            $(this).parent().addClass('checked');
        }
        else $(this).parent().removeClass('checked');
    });
    
    // Remove Product 
    $('.removeProduct').on('click' , function(){
        $(this).parent().hasClass('lineProduct') ? $(this).parent().remove() : $(this).parents('tr').remove() ;
    });

    // coupon
    $('.couponBtn').on('click' , function(){
        $(this).addClass('loadingBtn');
        setTimeout(function () {
            $('.couponBtn').removeClass('loadingBtn');
            $('.coupon').addClass('applied');
            // $('.coupon').addClass('failed');
            $('.coupon').hasClass('applied') ? $(this).find('i').addClass('icofont-check-alt').removeClass('icofont-close-line') : $(this).find('i').addClass('icofont-close-line').removeClass('icofont-check-alt');
        }, 600);

        $('.coupon').hasClass('applied') ? $('.couponMessage').text('تم تفعيل الكوبون بنجاح ') : $('.couponMessage').text('الرمز الذي أدخلته غير صالح');
    });

    // Payment Form 
    $('.paymentForm').submit(function(e) {
        e.preventDefault();
        $('#statusModal').modal('show')
    });

    // Profile Avatar
    $('.avatarFile').change(function () {
        let input = (this) ,
            image = $(this).siblings('.profiavatarVector');
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                image.attr('src', e.target.result);
                console.log(this);
            }
            reader.readAsDataURL(input.files[0]);
        }
    });

    // Allow Pofile Editing 
    $('.editField').on('click' , function() {
        $(this).parent('.field').find('input').removeAttr("readonly");  
    });

    // Wizzard 
    let wizard = document.querySelector('.wizard');
    if(wizard){
        let x = Array.from(document.querySelectorAll('.wizardTab')) ,
        prevBtn = document.getElementById('prevBtn') ,
        nextBtn = document.getElementById('nextBtn') ,
        form = document.getElementById('checkoutForm') ,
        currentTab = 0 ,
        last = x.length - 1 ;

        prevBtn.addEventListener('click', () => { changeStep('prev'); });
        nextBtn.addEventListener('click', () => { changeStep('next'); });

        // Show the Current Step
        showTab(currentTab); 

        function showTab(n) {     
            x[n].style.display = 'block';
            n == 0 || n == last ? prevBtn.style.display = "none" : prevBtn.style.display = "flex";
            n == last ? nextBtn.style.display = "none" : nextBtn.style.display = "flex";
            stepIndicator(n);
        }

        // Display the Active Step
        function changeStep(btn) {
            // Validate Form 
            validateForm();

            //  Exit the function if any field in the current wizardTab is invalid:
            if (currentTab == 1 && !validateForm()) return false;

            x[currentTab].style.display = 'none';
            btn === 'next' ?  currentTab++ : currentTab--;

            // Progress
            $('.wizardProgress').remove();
            $('.wizardSteps').append('<div class="wizardProgress"></div>');
            $('.wizardProgress').css('width', ((100 * currentTab) /( x.length - 1))+'%');

            // if you have reached the end of the form   ... the form gets submitted:
            // if (currentTab == x.length ) {    
            //     // Form Submit 
            //     form.addEventListener('submit', (e) => {
            //         e.preventDefault();
            //         const inputs = [];
            //         form.querySelectorAll('input').forEach((input) => {
            //             const { name, value } = input;
            //             inputs.push({ name, value });
            //         });
            //         form.reset();
            //     });
            //     return false;
            // }

            // Otherwise, display the correct wizardTab:
            showTab(currentTab);
        }

        function validateForm() {
            let  x, y, i, valid = true;
            x = document.getElementsByClassName('wizardTab');
            y = x[currentTab].getElementsByClassName('fieldInput');
    
            // A loop to checks every input field in the current wizardTab:
            // for (i = 0; i < y.length; i++) {
            //     if (y[i].value == "") {
            //         y[i].className += " invalid";
            //         valid = false;
            //     }
            // }
    
            return valid; 
        }
    
        // This function removes the "active" class of all wizardStep...
        function stepIndicator(n) {
            let i , 
                x = document.getElementsByClassName('wizardStep');
    
            for (i = 0; i < x.length; i++) {
                x[i].className = x[i].className.replace(" active", "");
                n > i ? x[i].classList.add('finished') : x[i].classList.remove('finished') ;
            }
            n == last ? x[n].classList.add('finished') : x[n].className += " active";
        }
    }
    
    // Profile Subscription Progress
    let subscriptionStep = [...document.getElementsByClassName('subscriptionStep')].length ,
        activeStep = [...document.getElementsByClassName('subscriptionStep active')].length ,
        progressRange = `${(100 * activeStep) / subscriptionStep}%`;
    $('.subsProgress').css('width', progressRange);
   
    // Show Map to choose Location 
    $('.showMap').on('click' , function() {
        $('.addressMap').toggle('slow');  
    });

    // Delete Address
    $('.deleteAddress').on('click' , function() {
        $(this).parents('.address').parent().remove();
    });

    // Planet radio Button
    $('.planetBox input').on('change', function (){
        if($(this).is(":checked")) {
            $('.planetBox').removeClass('checked');
            $(this).parent().addClass('checked');
        }
        else $(this).parent().removeClass('checked');
    });

    // Package Form 
    $('.packageForm').submit(function(e) {
        e.preventDefault();
        $('#statusModal').modal('show')
    });

    // Remove Package Item 
    $('.removeProduct').on('click' , function(){
        $(this).parents('.packageItem').remove();
    });


    // Title Animation
    setInterval(function() {
        $('.secHeader h2 ').toggleClass('animated')
    }, 1000);


    // iniat WOW Js
    new WOW().init();

})(jQuery);

