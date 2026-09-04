document.addEventListener("DOMContentLoaded", () => {

    const body =
        document.body;

    const themeButton =
        document.getElementById(
            "themeButton"
        );

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );

    const navLinks =
        document.getElementById(
            "navLinks"
        );

    const loader =
        document.getElementById(
            "loader"
        );

    const year =
        document.getElementById(
            "year"
        );


    /* =========================================
       THEME
    ========================================== */

    if (
        localStorage.getItem(
            "jeosliciousTheme"
        ) === "light"
    ) {

        body.classList.add(
            "light-mode"
        );

    }


    updateTheme();


    themeButton?.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "light-mode"
            );


            localStorage.setItem(
                "jeosliciousTheme",
                body.classList.contains(
                    "light-mode"
                )
                    ? "light"
                    : "dark"
            );


            updateTheme();

        }
    );


    function updateTheme() {

        if (!themeButton) return;


        themeButton.textContent =
            body.classList.contains(
                "light-mode"
            )
                ? "🌙"
                : "☀";

    }


    /* =========================================
       MOBILE MENU
    ========================================== */

    menuToggle?.addEventListener(
        "click",
        () => {

            const open =
                navLinks.classList.toggle(
                    "show"
                );


            menuToggle.setAttribute(
                "aria-expanded",
                String(open)
            );

        }
    );


    navLinks
        ?.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "show"
                    );


                    menuToggle?.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });


    /* =========================================
       YEAR
    ========================================== */

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =========================================
       LOADER
    ========================================== */

    window.addEventListener(
        "load",
        () => {

            setTimeout(
                () => {

                    loader?.classList.add(
                        "hide"
                    );

                },
                700
            );

        }
    );


    /* =========================================
       SCROLL REVEAL
    ========================================== */

    const revealItems =
        document.querySelectorAll(
            ".reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold:
                    0.12
            }
        );


    revealItems.forEach(
        item => {

            revealObserver.observe(
                item
            );

        }
    );


    /* =========================================
       SERVICE FILTER
    ========================================== */

    const filters =
        document.querySelectorAll(
            ".filter"
        );


    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    filters.forEach(
        filter => {

            filter.addEventListener(
                "click",
                () => {

                    filters.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    filter.classList.add(
                        "active"
                    );


                    const selected =
                        filter.dataset.filter;


                    serviceCards.forEach(
                        card => {

                            const visible =
                                selected === "all" ||
                                card.dataset.category ===
                                selected;


                            card.classList.toggle(
                                "is-hidden",
                                !visible
                            );

                        }
                    );

                }
            );

        }
    );


    /* =========================================
       SERVICE SELECTION
    ========================================== */

    const serviceSelect =
        document.getElementById(
            "service"
        );


    document
        .querySelectorAll(
            ".select-service"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        if (
                            serviceSelect
                        ) {

                            serviceSelect.value =
                                button.dataset.service ||
                                "";

                        }


                        document
                            .getElementById(
                                "booking"
                            )
                            ?.scrollIntoView({
                                behavior:
                                    "smooth"
                            });


                        showToast(
                            `${button.dataset.service} selected.`
                        );

                    }
                );

            }
        );


    /* =========================================
       DATE VALIDATION
    ========================================== */

    const dateInput =
        document.getElementById(
            "date"
        );


    if (dateInput) {

        const today =
            new Date();


        const yearValue =
            today.getFullYear();


        const monthValue =
            String(
                today.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const dayValue =
            String(
                today.getDate()
            ).padStart(
                2,
                "0"
            );


        dateInput.min =
            `${yearValue}-${monthValue}-${dayValue}`;

    }


    /* =========================================
       BOOKING FORM
    ========================================== */

    const bookingForm =
        document.getElementById(
            "bookingForm"
        );


    const formMessage =
        document.getElementById(
            "formMessage"
        );


    const bookingResult =
        document.getElementById(
            "bookingResult"
        );


    const bookingSummary =
        document.getElementById(
            "bookingSummary"
        );


    bookingForm?.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "name"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "phone"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "email"
                    )
                    .value
                    .trim();


            const service =
                document
                    .getElementById(
                        "service"
                    )
                    .value;


            const date =
                document
                    .getElementById(
                        "date"
                    )
                    .value;


            const time =
                document
                    .getElementById(
                        "time"
                    )
                    .value;


            const notes =
                document
                    .getElementById(
                        "notes"
                    )
                    .value
                    .trim();


            /* VALIDATION */


            if (
                name.length < 2
            ) {

                return setMessage(
                    "Please enter your full name."
                );

            }


            if (
                !/^[0-9+()\-.\\s]{7,25}$/
                    .test(phone)
            ) {

                return setMessage(
                    "Please enter a valid phone number."
                );

            }


            if (
                email &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(email)
            ) {

                return setMessage(
                    "Please enter a valid email address."
                );

            }


            if (!service) {

                return setMessage(
                    "Please select a service."
                );

            }


            if (!date) {

                return setMessage(
                    "Please select a date."
                );

            }


            const readableDate =
                new Date(
                    `${date}T00:00:00`
                ).toLocaleDateString(
                    undefined,
                    {
                        year:
                            "numeric",

                        month:
                            "long",

                        day:
                            "numeric"
                    }
                );


            const summary =
                `Jeoslicious Wig Revamp Service Booking\n` +
                `Name: ${name}\n` +
                `Phone: ${phone}\n` +
                `Email: ${email || "Not provided"}\n` +
                `Service: ${service}\n` +
                `Date: ${readableDate}\n` +
                `Time: ${time}` +
                `${notes ? `\nNotes: ${notes}` : ""}`;


            bookingSummary.textContent =
                `${name}, your ${service} request for ${readableDate} at ${time.toLowerCase()} has been prepared.`;


            bookingResult.dataset.summary =
                summary;


            bookingResult.hidden =
                false;


            /* SEND TO SQL BACKEND */


            try {

                const response =
                    await fetch(
                        "/api/bookings",
                        {

                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    fullName:
                                        name,

                                    phone:
                                        phone,

                                    email:
                                        email,

                                    service:
                                        service,

                                    preferredDate:
                                        date,

                                    preferredTime:
                                        time,

                                    notes:
                                        notes
                                })

                        }
                    );


                const data =
                    await response.json();


                if (
                    !response.ok
                ) {

                    throw new Error(
                        data.error ||
                        "Booking failed."
                    );

                }


                setMessage(
                    `Booking #${data.bookingId} saved to SQL.`
                );


                showToast(
                    "Booking saved successfully."
                );


            } catch {

                setMessage(
                    "Demo booking created. Run server.js to save bookings to SQL."
                );


                showToast(
                    "Booking summary created."
                );

            }

        }
    );


    function setMessage(
        message
    ) {

        if (
            formMessage
        ) {

            formMessage.textContent =
                message;

        }

    }


    /* =========================================
       COPY BOOKING
    ========================================== */

    document
        .getElementById(
            "copyBooking"
        )
        ?.addEventListener(
            "click",
            async () => {

                const summary =
                    bookingResult?.dataset
                        .summary;


                if (!summary) return;


                try {

                    await navigator
                        .clipboard
                        .writeText(
                            summary
                        );


                    showToast(
                        "Booking summary copied."
                    );


                } catch {

                    showToast(
                        "Copy was blocked by the browser."
                    );

                }

            }
        );


    /* =========================================
       BEFORE / AFTER SLIDER
    ========================================== */

    const comparisonSlider =
        document.getElementById(
            "comparisonSlider"
        );


    const beforeClip =
        document.getElementById(
            "beforeClip"
        );


    const comparisonLine =
        document.getElementById(
            "comparisonLine"
        );


    function updateComparison() {

        if (
            !comparisonSlider ||
            !beforeClip ||
            !comparisonLine
        ) {

            return;

        }


        const value =
            Number(
                comparisonSlider.value
            );


        beforeClip.style.width =
            `${value}%`;


        comparisonLine.style.left =
            `${value}%`;

    }


    comparisonSlider?.addEventListener(
        "input",
        updateComparison
    );


    updateComparison();


    /* =========================================
       BACK TO TOP
    ========================================== */

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    window.addEventListener(
        "scroll",
        () => {

            backToTop?.classList.toggle(
                "show",
                window.scrollY > 500
            );

        }
    );


    backToTop?.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top:
                    0,

                behavior:
                    "smooth"

            });

        }
    );


    /* =========================================
       TOAST
    ========================================== */

    function showToast(
        message
    ) {

        const toast =
            document.getElementById(
                "toast"
            );


        if (!toast) return;


        toast.textContent =
            message;


        toast.classList.add(
            "show"
        );


        clearTimeout(
            showToast.timer
        );


        showToast.timer =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                2400
            );

    }

});


document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const phone = document.querySelector("#phone").value;
    const email = document.querySelector("#email").value;
    const service = document.querySelector("#service").value;
    const date = document.querySelector("#date").value;
    const time = document.querySelector("#time").value;
    const notes = document.querySelector("#notes").value;

    const message = `
📋 NEW BOOKING REQUEST

👤 Full Name: ${name}
📱 Phone: ${phone}
📧 Email: ${email}
💇 Service: ${service}
📅 Preferred Date: ${date}
⏰ Preferred Time: ${time}
📝 Extra Notes: ${notes}
    `;

    // 🔴 PUT YOUR WHATSAPP NUMBER HERE
    const whatsappNumber = "2348012345678";

    const whatsappURL =
        "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
});
