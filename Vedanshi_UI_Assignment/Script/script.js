$(document).ready(function() {
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();
        const validLogins = {
            "hello@test.com": "test",
            "john.doe@test.com": "hello",
            "john.doe@test.com": "john"
        };

        if (validLogins[email] && (validLogins[email] === password || validLogins[email].includes(password))) {
            sessionStorage.setItem('loggedInEmail', email);
            window.location.href = "home.html";
        } else {
            alert("Invalid email or password.");
        }
    });
    const userEmail = sessionStorage.getItem('loggedInEmail');
    if (userEmail) {
        $('#userEmail').text(userEmail);
    }
    $('#colorFirstRow').click(function() {
        $('table tbody tr:first').css('background-color', 'red');
    });

    $('#colorLastRow').click(function() {
        $('table tbody tr:last').css('background-color', 'red');
    });

    $('#resetColors').click(function() {
        $('table tbody tr').css('background-color', '');
    });
});
