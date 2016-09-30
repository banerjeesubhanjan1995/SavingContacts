// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    $(function () {
        if ($.isWin) {
           $('#mainNav').append('<div class="segmented horizontal align-flush"><button id="saveContact">Save Contact</button></div>');
           document.getElementById('themeStylesheet').setAttribute('href', './css/chui-win-3.8.5.css');
        } else {
            document.getElementById('themeStylesheet').setAttribute('href', './css/chui-android-3.8.5.css');
            $('#mainNav').append('<button id="saveContact">Save Contact</button>');
        }
    });

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        $("#saveContact").on("singletap", function () {
            var newContact = navigator.contacts.create();
            newContact.displayName = document.getElementById("dspName").value;
            newContact.nickname = document.getElementById("nickName").value;
            var contact_work = document.getElementById("contactWork").value;
            var contact_mobile = document.getElementById("contactMobile").value;
            var contact_home = document.getElementById("contactHome").value;

            var phoneNumbers = [];
            phoneNumbers[0] = new ContactField('work', contact_work, false);
            phoneNumbers[1] = new ContactField('mobile', contact_mobile, true);
            phoneNumbers[2] = new ContactField('home', contact_home, false);
            newContact.phoneNumbers = phoneNumbers;

            var organization = [];
            var cmp_name = document.getElementById("cmpName").value;
            var dept_name = document.getElementById("dept").value;
            var designation = document.getElementById("designation").value;

            organization[0] = new ContactOrganization(true, 'work', cmp_name, dept_name, designation);
            newContact.organizations = organization;
            var dspName = document.getElementById("dspName").value;
            if (newContact.displayName != "" && newContact.nickname != "") {
                newContact.save(onSaveSuccess, onSaveError);
            }
            else {
                alert('Please enter display name and nick name');
            }
        });
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();

function onSaveSuccess() {
    document.getElementById("dspName").value = "";
    document.getElementById("nickName").value = "";
    document.getElementById("contactWork").value = "";
    document.getElementById("contactMobile").value = "";
    document.getElementById("contactHome").value = "";
    document.getElementById("cmpName").value = "";
    document.getElementById("dept").value = "";
    document.getElementById("designation").value = "";
    alert("Contact is saved successfully.");

}

function onSaveError() {
    alert('Unable to save contact');
}
