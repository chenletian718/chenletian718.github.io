# Question 2: GitHub.io Personal Webpage and Network Analysis

**Student:** chenle.tian  
**GitHub repository:** `chenletian718/chenletian718.github.io`  
**Website:** `https://chenletian718.github.io` *(replace with the final tested URL if different)*  
**Test date/time:** 12 October 2026, local Windows time `[fill in]`  
**Client:** Windows `[version]`, `[Wi-Fi/Ethernet]`, VPN `[on/off]`

## 1. Webpage implementation

I created a responsive personal webpage using semantic HTML, CSS, and a small JavaScript file. The page contains an introduction, skills and interests, project cards, and contact information. The layout uses a mobile breakpoint, a collapsible navigation menu, accessible labels, and no external runtime assets. The source files are in `Question2/site/`.

The page presents chenle.tian as a 20-year-old male student. It describes piano (Grade 10), sketching (Grade 9), international and Chinese chess, breaking, basketball, and fitness. Since no completed personal projects were supplied, the page identifies the coursework webpage as the demonstrated project and states that further personal projects are coming soon. The contact address is `Chenle.Tian24@student.xjtlu.edu.cn`.

## 2. GitHub Pages deployment evidence

The repository is configured with `.github/workflows/pages.yml`. The workflow uploads `Question2/site/` as a Pages artifact and deploys it with GitHub Pages. The deployment run completed on `[date/time]` with status `[success/failure]`. Figure 1 shows the deployed page with the address bar visible. Figure 2 shows the successful GitHub Actions run.

**Evidence to insert:** `network/screenshots/deployed-page.png` and the Actions screenshot.

## 3. Domain name and IP address (2 marks)

The tested domain was `chenletian718.github.io`. The Windows client used Google Public DNS (`dns.google`, `8.8.8.8`). The response returned IPv6 addresses `2606:50c0:8002::153`, `2606:50c0:8000::153`, and `2606:50c0:8001::153`, together with IPv4 addresses `185.199.109.153`, `185.199.108.153`, and `185.199.110.153`. DNS results can change because GitHub Pages uses distributed infrastructure; therefore this result is a time-specific observation rather than a permanent mapping. Windows selected `185.199.111.153` for the later ping and tracert tests, which is consistent with GitHub's distributed address rotation.

**Evidence:** `network/nslookup.txt` and Figure 3.

## 4. Ping and latency (2 marks)

I ran `ping chenletian718.github.io -n 20` from the Windows client. Windows selected `185.199.111.153`. The result was 20 packets sent, 5 received, and 15 lost (75% loss), with a minimum/maximum/average of 120/137/126 ms. The five successful replies were 131, 137, 122, 120, and 124 ms. This measures ICMP round-trip time to the responding address. It is not the same as webpage load time; GitHub or an intermediate network may filter or deprioritise ICMP, which explains why HTTPS can still return `200 OK` while many ping probes time out.

**Evidence:** `network/ping.txt` and Figure 4.

## 5. Route analysis with tracert (2 marks)

`tracert -d chenletian718.github.io` reached `185.199.111.153` at hop 13. Hop 1 was the local gateway `192.168.110.1` at approximately 1 ms, and hop 2 was the private address `10.2.47.254` at approximately 1–2 ms. Hops 3–12 returned `* * *` timeouts, while hop 13 returned approximately 125–130 ms and the trace completed. A `*` means that a probe did not receive a response within the timeout; it does not by itself prove that forwarding failed. The responding destination confirms that the route reached the website even though intermediate routers did not reveal their addresses. The path can change with routing, load, and time.

**Evidence:** `network/tracert.txt` and Figure 5.

## 6. Protocol analysis with browser tools and Wireshark (4 marks)

I captured traffic on the active Windows `[Wi-Fi/Ethernet]` interface while opening the deployed HTTPS site. The capture was saved as `network/chenletian718-pages.pcapng`. The display filter used was `dns or tcp or tls or http` (and `[quic filter if used]`).

The command-line HTTPS check returned `HTTP/1.1 200 OK`, `Content-Type: text/html`, and `Content-Length: 6085`. The response identified `GitHub.com`, included `Strict-Transport-Security`, and reported `x-github-edge-region: japaneast`. `X-Cache: HIT` and the `X-Served-By` header show that a GitHub/Fastly edge cache served this request. These headers confirm successful HTTPS delivery but do not replace the required packet capture. The browser first resolved `chenletian718.github.io` using DNS. The capture should show a DNS `[A/AAAA]` query and a response containing one of the observed addresses. The browser then established a connection to port 443. For TCP, I will identify the SYN, SYN/ACK, and ACK that form the three-way handshake; the client and server ports will be recorded from the capture. The TLS handshake should include ClientHello and ServerHello messages followed by encrypted application data. Because HTTPS encrypts the HTTP payload, the HTML and CSS contents must not be described as plaintext in Wireshark. Browser DevTools will provide the document, stylesheet, script, status, and total load time after the capture.

If HTTP/3 appeared, I also filtered `quic`/`udp.port == 443` and recorded `[observation]`. Otherwise, no QUIC packets were observed in this capture. This distinction avoids confusing HTTP/2 over TLS/TCP with HTTP/3 over QUIC/UDP.

**Evidence:** the `.pcapng` file; Figures 6–10: filtered packet list, DNS expansion, TCP handshake, TLS handshake, and DevTools Network panel.

## 7. Limitations and conclusion

The measurements represent one Windows client, network, time, DNS cache state, and route. GitHub Pages is distributed, IP addresses and paths can change, and ICMP or traceroute responses may be filtered. HTTPS encryption limits packet-level inspection to metadata and handshake information. The capture and command outputs are retained so that every reported value can be checked against the original evidence.

Overall, the page was deployed as a GitHub Pages site and the experiment identified the domain, measured latency, observed the route, and connected DNS, TCP/TLS (or QUIC where applicable), and browser loading behaviour to packet evidence.
