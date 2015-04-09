  $(document).ready(function () {
            $("#button").click(function () {
                var text = $("#class").val();
                var color = $("#color").val();
                text = "." + text;
                $(text).css("background", color);
            });
        });