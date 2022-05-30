window.cookieconsent.initialise({
  // name: "cookieconsent_status"
  // domain: "",
  // path: "/",
  // secure: false, // If secure is true, the cookies will only be allowed over https
  // expiryDays: 365,
  layout: "basic", // "basic" - "basic-close" - "basic-header"
  position: "bottom", // "bottom" - "top" - "bottom-left" - "bottom-right"
  // static: true,
  type: "info", // "info" - "opt-out" - "opt-in"
  theme: "classic", // "classic" - "edgeless"
  palette: {
    popup: {
      background: "#252e39"
    },
    button: {
      background: "#14a7d0"
    }
  },
  revokable:true,
  showLink: true,
  // dismissOnScroll: 200,
  // dismissOnWindowClick: false,
  content: {
		header: "Questo sito utilizza i Cookie",
    message: "Questo sito web utilizza i cookie. Cliccando \"Accetto\" o continuando la navigazione, acconsenti all'utilizzo.",
    // message: "Questo sito web utilizza i cookie per assicurarti la migliore esperienza sul nostro sito web.",
    dismiss: "Accetto",
    allow: "Permetti cookies",
    deny: "Rifiuta",
    link: "Maggiori informazioni",
    href: "./cookie-policy.html",
    close: '&#x274c;',
    policy: 'Cookie Policy',
    target: '_blank'
  }
});
