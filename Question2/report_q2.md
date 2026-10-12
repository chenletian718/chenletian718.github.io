# Question 2: GitHub.io Personal Webpage and Network Analysis

**Student:** chenle.tian  
**GitHub repository:** `chenletian718/chenletian718.github.io`  
**Website:** `https://chenletian718.github.io` *(replace with the final tested URL if different)*  
**Test date/time:** `[fill in]`  
**Client:** Windows `[version]`, `[Wi-Fi/Ethernet]`, VPN `[on/off]`

## 1. Webpage implementation

I created a responsive personal webpage using semantic HTML, CSS, and a small JavaScript file. The page contains an introduction, skills and interests, project cards, and contact information. The layout uses a mobile breakpoint, a collapsible navigation menu, accessible labels, and no external runtime assets. The source files are in `Question2/site/`.

The page presents chenle.tian as a 20-year-old male student. It describes piano (Grade 10), sketching (Grade 9), international and Chinese chess, breaking, basketball, and fitness. Since no completed personal projects were supplied, the page identifies the coursework webpage as the demonstrated project and states that further personal projects are coming soon. The contact address is `Chenle.Tian24@student.xjtlu.edu.cn`.

## 2. GitHub Pages deployment evidence

The repository is configured with `.github/workflows/pages.yml`. The workflow uploads `Question2/site/` as a Pages artifact and deploys it with GitHub Pages. The deployment run completed on `[date/time]` with status `[success/failure]`. Figure 1 shows the deployed page with the address bar visible. Figure 2 shows the successful GitHub Actions run.

**Evidence to insert:** `network/screenshots/deployed-page.png` and the Actions screenshot.

## 3. Domain name and IP address (2 marks)

The tested domain was `chenletian718.github.io`. On the Windows client, `nslookup`/`Resolve-DnsName` returned the following address(es): `[insert observed IPv4/IPv6 addresses]`. DNS results can change because GitHub Pages uses distributed infrastructure; therefore this result is a time-specific observation rather than a permanent mapping.

**Evidence:** `network/nslookup.txt` and Figure 3.

## 4. Ping and latency (2 marks)

I ran `ping chenletian718.github.io -n 20` from `[network]`. The result was `[sent]` packets sent, `[received]` received, `[loss]%` loss, with a minimum/maximum/average of `[values]` ms. This measures ICMP round-trip time to the responding address. It is not the same as webpage load time, and ICMP may be filtered or deprioritised.

**Evidence:** `network/ping.txt` and Figure 4.

## 5. Route analysis with tracert (2 marks)

`tracert -d chenletian718.github.io` recorded `[number]` responding hops before reaching `[destination or final observation]`. The main observations were `[describe latency changes, private gateway, ISP/transit hops, and any timed-out hops]`. A `*` means that a probe did not receive a response within the timeout; it does not by itself prove that forwarding failed. The path can change with routing, load, and time.

**Evidence:** `network/tracert.txt` and Figure 5.

## 6. Protocol analysis with browser tools and Wireshark (4 marks)

I captured traffic on the active Windows `[Wi-Fi/Ethernet]` interface while opening the deployed HTTPS site. The capture was saved as `network/chenletian718-pages.pcapng`. The display filter used was `dns or tcp or tls or http` (and `[quic filter if used]`).

The browser first resolved `chenletian718.github.io` using DNS. The capture showed a DNS `[A/AAAA]` query and a response containing `[observed address]`. The browser then established a connection to port 443. For TCP, I identified the SYN, SYN/ACK, and ACK that form the three-way handshake; the client and server ports were `[values]`. The TLS handshake included `[ClientHello/ServerHello/certificate messages observed]`, followed by encrypted application data. Because HTTPS encrypts the HTTP payload, the HTML and CSS contents were not read as plaintext in Wireshark. Browser DevTools showed the document, stylesheet, script, status `[status]`, and total load time `[time]`.

If HTTP/3 appeared, I also filtered `quic`/`udp.port == 443` and recorded `[observation]`. Otherwise, no QUIC packets were observed in this capture. This distinction avoids confusing HTTP/2 over TLS/TCP with HTTP/3 over QUIC/UDP.

**Evidence:** the `.pcapng` file; Figures 6–10: filtered packet list, DNS expansion, TCP handshake, TLS handshake, and DevTools Network panel.

## 7. Limitations and conclusion

The measurements represent one Windows client, network, time, DNS cache state, and route. GitHub Pages is distributed, IP addresses and paths can change, and ICMP or traceroute responses may be filtered. HTTPS encryption limits packet-level inspection to metadata and handshake information. The capture and command outputs are retained so that every reported value can be checked against the original evidence.

Overall, the page was deployed as a GitHub Pages site and the experiment identified the domain, measured latency, observed the route, and connected DNS, TCP/TLS (or QUIC where applicable), and browser loading behaviour to packet evidence.
