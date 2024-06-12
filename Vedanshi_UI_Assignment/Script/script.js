$(document).ready(function() {
    const validLogins = {
        "hello@test.com": "test",
        "john.doe@test.com": "hello",
        "john.doe@test.com": "john"
    };
    function isRegistered(email) {
        return Object.keys(validLogins).includes(email);
    }
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();

        if (isRegistered(email) && validLogins[email] === password) {
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
    $('#loginButton').on('click', function() {
        var email = $('#email').val();
        var password = $('#password').val();
        if (email && password) {
            if (isRegistered(email)) {
                window.location.href = 'home.html?email=' + encodeURIComponent(email);
            } else {
                alert('Email not registered. Please register before logging in.');
            }
        } else {
            alert('Please enter both email and password.');
        }
    });
});
