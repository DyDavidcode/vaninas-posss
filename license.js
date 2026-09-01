(function () {
    var LICENSE_ID = window.__DY_LICENSE_ID || "PON_AQUI_EL_ID_DE_LICENCIA";
    var CHECK_INTERVAL_MIN = 5;
    var SUPPORT_WHATSAPP = "529619156443";
    var API_URL = "https://firestore.googleapis.com/v1/projects/agenda-dy/databases/(default)/documents/licenses/" + encodeURIComponent(LICENSE_ID);
  
    function whatsappLink() {
        var msg = "Hola DY Code Studio, mi servicio est\u00e1 suspendido. Quiero regularizar mi pago.";
        return "https://wa.me/" + SUPPORT_WHATSAPP + "?text=" + encodeURIComponent(msg);
    }
  
    function showSuspendedScreen() {
        if (document.getElementById("dy-license-overlay")) return;
        var overlay = document.createElement("div");
        overlay.id = "dy-license-overlay";
        overlay.className = "fixed inset-0 z-[999999] bg-theme-bg flex items-center justify-center p-4";
        overlay.innerHTML =
            '<div class="glass rounded-2xl p-6 md:p-8 w-full max-w-sm mx-auto border border-white shadow-2xl text-center animate-slideIn">' +
            '<div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200">' +
            '<span class="text-3xl">🔒</span>' +
            '</div>' +
            '<h1 class="text-lg md:text-xl font-bold text-theme-redDark mb-2">Servicio Suspendido</h1>' +
            '<p class="text-sm text-theme-textMuted leading-relaxed font-medium">Tu suscripci\u00f3n no est\u00e1 activa. Contacta a tu proveedor para regularizar tu pago y reactivar el servicio.</p>' +
            '<a href="' + whatsappLink() + '" target="_blank" rel="noopener" class="flex items-center justify-center gap-2 w-full mt-5 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition hover:opacity-90 shadow-md">' +
            '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>' +
            ' Contactar Soporte por WhatsApp</a>' +
            '<p class="text-xs font-semibold text-theme-textMuted mt-4">DY Code Studio · 961 915 6443</p>' +
            '</div>';
        document.body.appendChild(overlay);
    }
  
    function checkLicense() {
        if (!LICENSE_ID || LICENSE_ID.indexOf("PON_AQUI") !== -1) return;
        fetch(API_URL)
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data && data.fields && data.fields.active && data.fields.active.booleanValue === false) {
                    showSuspendedScreen();
                }
            })
            .catch(function () {});
    }
  
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", checkLicense);
    } else {
        checkLicense();
    }
    setInterval(checkLicense, CHECK_INTERVAL_MIN * 60 * 1000);
  })();
