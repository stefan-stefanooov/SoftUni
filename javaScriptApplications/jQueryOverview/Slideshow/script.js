$(function () {
        
        $(document).ready(function () {
            $('#process-left').on('click', processLeft);
            $('#process-right').on('click', processRight);
            setInterval( processRight, 500 );
        });
        function processLeft(){
            var $active = $("img.active");
                    if ($active.prev().length) {
                        moveToPrev();
                    }else {
                         $active.removeClass('active').addClass('inactive');
                            $('#last').addClass('active').removeClass('inactive');
                    };
            }

            function processRight(){
                var $active = $("img.active");
                    if ($active.next().length) {
                        moveToNext();
                    }else {
                            $active.removeClass('active').addClass('inactive');
                            $('img#first').addClass('active').removeClass('inactive');
                    };
            }

         function moveToNext(){
                var $active = $("img.active");
                var $next = $active.next();
                $next.addClass('active');
                $next.removeClass('inactive');
                $active.removeClass('active');
                $active.addClass('inactive');
        }

        function moveToPrev(){
                var $active = $("img.active");
                var $prev = $active.prev();
                $prev.addClass('active');
                $prev.removeClass('inactive');
                $active.removeClass('active');
                $active.addClass('inactive');
        }

}());