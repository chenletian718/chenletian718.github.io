# Wireshark capture guide (Windows)

This capture must be made on the student's own Windows computer so that the measurements represent the actual access path. It is separate from the cloud checkout validation.

1. Close existing browser tabs for the site. Open Wireshark as an administrator if the capture interface requires it.
2. On the start screen, choose the interface whose live graph moves while browsing (normally **Wi-Fi** or **Ethernet**). Do not choose a disconnected adapter, loopback, or a virtual VPN adapter unless that is the interface carrying the browser traffic.
3. Start capture. In a new private browser window, open `https://chenletian718.github.io`, hard-refresh once (`Ctrl+F5`), wait for the page and its CSS/JavaScript to finish, then stop capture.
4. Apply this display filter to focus on the site conversation:

   `dns or tcp or tls or http`

   If the browser uses HTTP/3, also try `quic` and `udp.port == 443`. Modern HTTPS encrypts page contents; report the visible TLS handshake and packet metadata instead of claiming to see plaintext HTML.
5. For DNS, select the query for `chenletian718.github.io` and expand **Domain Name System**. Record the query type, response address(es), and response time if visible.
6. For TCP, find the connection to port 443 and expand **Transmission Control Protocol**. Identify the SYN, SYN/ACK, and ACK; record the client/server ports and relative sequence/acknowledgement behaviour.
7. For TLS, expand **Transport Layer Security**. Identify ClientHello, ServerHello, certificate-related handshake messages if visible, and encrypted application data. Note that HTTPS protects the HTTP content.
8. Save the capture as `Question2/network/chenletian718-pages.pcapng`. Keep the original capture and do not edit packets.

Required screenshots: interface list before capture; filtered packet list; expanded DNS packet; expanded TCP three-way-handshake packet; expanded TLS handshake packet; and the save dialog/path or file listing showing the `.pcapng` file. Include the filter text in at least one screenshot.
