// Header
fetch("./header.html")
	.then(res => res.text())
	.then(html => {
		const container = document.querySelector("#header-container");
		container.innerHTML = html;
	});

// NavBar
fetch("./navbar.html")
	.then(res => res.text())
	.then(html => {
		const container = document.querySelector("#nav-container");
		container.innerHTML = html;
	});

// Footer
fetch("./footer.html")
	.then(res => res.text())
	.then(html => {
		const container = document.querySelector("#footer-container");
		container.innerHTML = html;
	});