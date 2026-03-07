var Din0=(function(){"use strict";const C=["idle","thinking","talking","happy","error"];function I(i,t){C.forEach(e=>{i.classList.remove(`din0-state-${e}`)}),i.classList.add(`din0-state-${t}`)}function b(i="md"){const t=document.createElement("div");t.className=`din0-avatar din0-avatar-${i}`,t.innerHTML=`
    <span class="din0-avatar-eye left"></span>
    <span class="din0-avatar-eye right"></span>
    <span class="din0-avatar-mouth"></span>
  `;const e=n=>{I(t,n)};return e("idle"),{root:t,setState:e}}const v=30,M=["pricing","price","demo","plan","quote","subscription"],B=["bug","issue","error","help","support","problem"],D=["where","find","go to","open","show"];function w(i){return`din0:${i}:history`}function E(i){return i.toLowerCase().trim()}function g(i){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?`${i}-${crypto.randomUUID()}`:`${i}-${Date.now()}-${Math.random().toString(16).slice(2,8)}`}function S(){var a;const i=Array.from(document.querySelectorAll("p")).map(s=>{var o;return((o=s.textContent)==null?void 0:o.trim())??""}).filter(s=>s.length>40).slice(0,30),t=Array.from(document.querySelectorAll("a[href]")).map(s=>s.getAttribute("href")??"").filter(s=>s.length>0).slice(0,40),e=document.title||"Untitled page",n=document.querySelector('meta[name="description"]'),r=((a=n==null?void 0:n.content)==null?void 0:a.trim())??"";return{url:window.location.href,title:e,meta:r,paragraphs:i,links:t}}function T(i){const t=E(i);return M.some(e=>t.includes(e))?"sales":B.some(e=>t.includes(e))?"support":D.some(e=>t.includes(e))?"navigation":"general"}function N(i){try{const t=window.localStorage.getItem(w(i));if(!t)return[];const e=JSON.parse(t);return Array.isArray(e)?e.filter(n=>typeof n.content=="string").slice(-v):[]}catch{return[]}}function m(i,t){try{window.localStorage.setItem(w(i),JSON.stringify(t.slice(-v)))}catch{}}function O(i){return i.split(`
`).map(e=>e.trim()).filter(e=>e.startsWith("data:")).map(e=>e.replace("data:","").trim())}async function P(i,t,e){const n=await fetch(`${t}/api/chat/stream`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!n.ok)throw new Error(`Din0 backend error (${n.status})`);if(!n.body){const d=await n.text();return e(d),d}const r=n.body.getReader(),a=new TextDecoder;let s="",o="";for(;;){const{done:d,value:u}=await r.read();if(d)break;s+=a.decode(u,{stream:!0});const h=s.split(`

`);s=h.pop()??"";for(const x of h){const l=O(x);for(const c of l)if(!(!c||c==="[DONE]"))try{const y=JSON.parse(c);if(y.error)throw new Error(y.error);y.token&&(o+=y.token,e(y.token))}catch{o+=c,e(c)}}}return o}async function R(i,t,e){try{await fetch(`${i}/api/context/index`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({agentId:t,context:e})})}catch{}}async function f(i,t){const e=JSON.stringify(t);if(typeof navigator.sendBeacon=="function"){const n=new Blob([e],{type:"application/json"});navigator.sendBeacon(`${i}/api/analytics`,n);return}try{await fetch(`${i}/api/analytics`,{method:"POST",headers:{"Content-Type":"application/json"},body:e,keepalive:!0})}catch{}}function k(){return"I could not reach the AI server right now. Please try again in a few seconds."}function $(i){const t=E(i),e={pricing:["#pricing","[data-section='pricing']","a[href*='pricing']"],docs:["#docs","[data-section='docs']","a[href*='docs']"],demo:["#demo","[data-section='demo']","a[href*='demo']"],contact:["#contact","[data-section='contact']","a[href*='contact']"]};for(const[n,r]of Object.entries(e))if(t.includes(n))for(const a of r){const s=document.querySelector(a);if(s)return s.scrollIntoView({behavior:"smooth",block:"start"}),!0}return!1}const q={primary:"#2d5bff",accent:"#0f172a",text:"#f8fafc",background:"#0b1220"};class U{constructor(t){if(this.rootHost=null,this.shadowRootRef=null,this.rootEl=null,this.panelEl=null,this.launcherBtn=null,this.greetingEl=null,this.messagesEl=null,this.inputEl=null,this.sendBtn=null,this.voiceBtn=null,this.quickActionsEl=null,this.launcherAvatar=null,this.headerAvatar=null,this.history=[],this.messageElements=new Map,this.pageContext=null,this.isOpen=!1,this.isSending=!1,!t.agentId)throw new Error("Din0.init requires agentId");this.agentId=t.agentId,this.position=t.position??"bottom-right",this.apiBaseUrl=t.apiBaseUrl??"http://localhost:8787",this.title=t.title??"Din_0 Assistant",this.greetingDelayMs=t.greetingDelayMs??1e4,this.greetingMessage=t.greetingMessage??"Hey, need help?",this.promptOverride=t.promptOverride,this.quickActions=t.quickActions??["Pricing","Book demo","Product docs"],this.mountSelector=t.mountSelector,this.enableVoice=t.enableVoice??!0,this.theme={...q,...t.theme??{}},this.plugins={searchDocs:e=>{const n=`/search?q=${encodeURIComponent(e)}`;window.location.assign(n)},generateExample:e=>{this.inputEl&&(this.inputEl.value=`Generate an example for: ${e}`,this.inputEl.focus())},openPage:e=>{window.location.assign(e)},...t.plugins??{}},this.instanceId=g(this.agentId)}mount(){if(this.rootHost)return;this.history=N(this.agentId),this.pageContext=S();const t=this.mountSelector?document.querySelector(this.mountSelector):document.body;if(!t)throw new Error(`Din0 mount target not found: ${this.mountSelector}`);const e=document.createElement("div");e.className="din0-host";const n=e.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=this.buildStyles(),n.appendChild(r);const a=document.createElement("div");a.className=`din0-root ${this.position}`;const s=this.createLauncher(),o=this.createGreeting(),d=this.createPanel();a.appendChild(o),a.appendChild(d),a.appendChild(s),n.appendChild(a),t.appendChild(e),this.rootHost=e,this.shadowRootRef=n,this.rootEl=a,this.renderInitialMessages(),this.scheduleGreeting(),R(this.apiBaseUrl,this.agentId,this.pageContext),f(this.apiBaseUrl,{agentId:this.agentId,type:"widget_loaded",url:window.location.href,ts:Date.now()})}destroy(){var t;this.greetingTimer&&window.clearTimeout(this.greetingTimer),this.messageElements.clear(),(t=this.rootHost)==null||t.remove(),this.rootHost=null,this.shadowRootRef=null,this.rootEl=null,this.panelEl=null,this.launcherBtn=null,this.greetingEl=null,this.messagesEl=null,this.inputEl=null,this.sendBtn=null,this.quickActionsEl=null,this.launcherAvatar=null,this.headerAvatar=null}createLauncher(){const t=document.createElement("button");return t.type="button",t.className="din0-launcher",t.setAttribute("aria-label","Open AI assistant"),this.launcherAvatar=b("md"),t.appendChild(this.launcherAvatar.root),t.addEventListener("click",()=>this.togglePanel()),this.launcherBtn=t,t}createGreeting(){const t=document.createElement("div");return t.className="din0-greeting",t.textContent=this.greetingMessage,t.hidden=!0,t.addEventListener("click",()=>this.openPanel()),this.greetingEl=t,t}createPanel(){const t=document.createElement("div");t.className="din0-panel",t.hidden=!0;const e=document.createElement("header");e.className="din0-panel-header";const n=document.createElement("div");n.className="din0-title-wrap",this.headerAvatar=b("sm"),n.appendChild(this.headerAvatar.root);const r=document.createElement("strong");r.className="din0-title",r.textContent=this.title,n.appendChild(r);const a=document.createElement("button");a.type="button",a.className="din0-close",a.textContent="x",a.setAttribute("aria-label","Close"),a.addEventListener("click",()=>this.closePanel()),e.appendChild(n),e.appendChild(a),t.appendChild(e);const s=document.createElement("div");s.className="din0-messages",t.appendChild(s),this.messagesEl=s;const o=document.createElement("div");o.className="din0-quick-actions",this.quickActions.forEach(l=>{const c=document.createElement("button");c.type="button",c.className="din0-chip",c.textContent=l,c.addEventListener("click",()=>{this.handleSend(l)}),o.appendChild(c)}),t.appendChild(o),this.quickActionsEl=o;const d=document.createElement("div");d.className="din0-composer";const u=document.createElement("input");u.className="din0-input",u.placeholder="Ask me anything about this site...",u.addEventListener("keydown",l=>{l.key==="Enter"&&(l.preventDefault(),this.handleSend())}),this.inputEl=u;const h=document.createElement("button");if(h.type="button",h.className="din0-send",h.textContent="Send",h.addEventListener("click",()=>{this.handleSend()}),this.sendBtn=h,d.appendChild(u),this.enableVoice){const l=document.createElement("button");l.type="button",l.className="din0-voice",l.textContent="Mic",l.addEventListener("click",()=>this.startVoiceInput()),d.appendChild(l),this.voiceBtn=l}d.appendChild(h),t.appendChild(d);const x=document.createElement("div");return x.className="din0-footer",x.textContent="Powered by Din_0",t.appendChild(x),this.panelEl=t,t}renderInitialMessages(){if(!this.messagesEl)return;if(this.history.length===0){const e={id:g("assistant"),role:"assistant",content:"Hi, I am Din_0. I can answer questions about this page.",createdAt:Date.now()};this.history.push(e),m(this.agentId,this.history)}this.history.slice(-20).forEach(e=>{this.renderMessage(e)}),this.scrollMessagesToBottom()}renderMessage(t){if(!this.messagesEl)return;const e=document.createElement("div");e.className=`din0-message din0-message-${t.role}`,e.textContent=t.content,this.messagesEl.appendChild(e),this.messageElements.set(t.id,e)}updateMessage(t,e){const n=this.messageElements.get(t);n&&(n.textContent=e,this.scrollMessagesToBottom())}scrollMessagesToBottom(){this.messagesEl&&(this.messagesEl.scrollTop=this.messagesEl.scrollHeight)}togglePanel(){if(this.isOpen){this.closePanel();return}this.openPanel()}openPanel(){var t;this.panelEl&&(this.panelEl.hidden=!1,this.isOpen=!0,this.greetingEl&&(this.greetingEl.hidden=!0),this.setAvatarState("talking"),window.setTimeout(()=>this.setAvatarState("idle"),500),(t=this.inputEl)==null||t.focus(),this.scrollMessagesToBottom(),f(this.apiBaseUrl,{agentId:this.agentId,type:"widget_opened",ts:Date.now()}))}closePanel(){this.panelEl&&(this.panelEl.hidden=!0,this.isOpen=!1,this.setAvatarState("idle"))}scheduleGreeting(){this.greetingDelayMs<=0||(this.greetingTimer=window.setTimeout(()=>{!this.isOpen&&this.greetingEl&&(this.greetingEl.hidden=!1)},this.greetingDelayMs))}setAvatarState(t){var e,n;(e=this.launcherAvatar)==null||e.setState(t),(n=this.headerAvatar)==null||n.setState(t)}async handleSend(t){if(!this.inputEl||this.isSending)return;const e=(t??this.inputEl.value).trim();if(!e)return;this.greetingEl&&(this.greetingEl.hidden=!0),this.openPanel(),t||(this.inputEl.value="");const n={id:g("user"),role:"user",content:e,createdAt:Date.now()};if(this.history.push(n),this.renderMessage(n),m(this.agentId,this.history),this.scrollMessagesToBottom(),f(this.apiBaseUrl,{agentId:this.agentId,type:"question_asked",message:e,url:window.location.href,ts:Date.now()}),this.tryRunPluginCommand(e))return;const r=T(e);r==="navigation"&&$(e)&&this.addSystemMessage("I highlighted that section on the page.");const a={id:g("assistant"),role:"assistant",content:"Din_0 is thinking...",createdAt:Date.now()};this.renderMessage(a),this.isSending=!0,this.setAvatarState("thinking");let s="";try{s=await P({agentId:this.agentId,message:e,history:this.history.slice(-12),context:this.pageContext??S(),intent:r,promptOverride:this.promptOverride},this.apiBaseUrl,o=>{s+=o,this.updateMessage(a.id,s),o.trim().length>0&&this.setAvatarState("talking")}),s.trim()||(s=k(),this.updateMessage(a.id,s)),this.history.push({...a,content:s}),m(this.agentId,this.history),this.setAvatarState("happy"),window.setTimeout(()=>this.setAvatarState("idle"),900),f(this.apiBaseUrl,{agentId:this.agentId,type:"answer_delivered",chars:s.length,ts:Date.now()})}catch(o){const d=k();this.updateMessage(a.id,d),this.history.push({...a,content:d}),m(this.agentId,this.history),this.setAvatarState("error"),window.setTimeout(()=>this.setAvatarState("idle"),1200),f(this.apiBaseUrl,{agentId:this.agentId,type:"chat_error",error:o instanceof Error?o.message:"unknown",ts:Date.now()})}finally{this.isSending=!1}}tryRunPluginCommand(t){const e=t.match(/^\/docs\s+(.+)/i);if(e)return this.plugins.searchDocs(e[1]),this.addSystemMessage("Opening docs search."),!0;const n=t.match(/^\/open\s+(.+)/i);if(n)return this.plugins.openPage(n[1]),this.addSystemMessage("Opening page."),!0;const r=t.match(/^\/example\s+(.+)/i);return r?(this.plugins.generateExample(r[1]),this.addSystemMessage("Example request pre-filled."),!0):!1}addSystemMessage(t){const e={id:g("system"),role:"system",content:t,createdAt:Date.now()};this.history.push(e),this.renderMessage(e),m(this.agentId,this.history),this.scrollMessagesToBottom()}startVoiceInput(){var n;const t=window.SpeechRecognition||window.webkitSpeechRecognition;if(!t){this.addSystemMessage("Voice mode is not supported by this browser.");return}const e=new t;e.lang=navigator.language||"en-US",e.interimResults=!1,e.maxAlternatives=1,(n=this.voiceBtn)==null||n.setAttribute("disabled","true"),this.voiceBtn&&(this.voiceBtn.textContent="..."),this.setAvatarState("thinking"),e.onresult=r=>{var s,o;const a=((s=r.results[0][0].transcript)==null?void 0:s.trim())??"";this.inputEl&&a&&(this.inputEl.value=a),(o=this.voiceBtn)==null||o.removeAttribute("disabled"),this.voiceBtn&&(this.voiceBtn.textContent="Mic"),this.handleSend()},e.onerror=()=>{var r;(r=this.voiceBtn)==null||r.removeAttribute("disabled"),this.voiceBtn&&(this.voiceBtn.textContent="Mic"),this.setAvatarState("idle"),this.addSystemMessage("Could not capture your voice. Please try again.")},e.onend=()=>{var r;(r=this.voiceBtn)==null||r.removeAttribute("disabled"),this.voiceBtn&&(this.voiceBtn.textContent="Mic"),this.setAvatarState("idle")},e.start()}buildStyles(){return`
      :host {
        all: initial;
      }

      .din0-root {
        --din0-primary: ${this.theme.primary};
        --din0-accent: ${this.theme.accent};
        --din0-text: ${this.theme.text};
        --din0-bg: ${this.theme.background};
        position: fixed;
        bottom: 20px;
        font-family: "Segoe UI", "Helvetica Neue", sans-serif;
        z-index: 2147483000;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
      }

      .din0-root.bottom-right {
        right: 20px;
      }

      .din0-root.bottom-left {
        left: 20px;
        align-items: flex-start;
      }

      .din0-launcher {
        width: 60px;
        height: 60px;
        border-radius: 999px;
        border: none;
        background: linear-gradient(135deg, var(--din0-primary), #00a3ff);
        color: white;
        cursor: pointer;
        box-shadow: 0 14px 35px rgba(0, 0, 0, 0.35);
        display: grid;
        place-items: center;
      }

      .din0-greeting {
        max-width: 240px;
        background: #ffffff;
        color: #0f172a;
        border-radius: 999px;
        padding: 10px 14px;
        font-size: 13px;
        box-shadow: 0 8px 25px rgba(15, 23, 42, 0.2);
        cursor: pointer;
      }

      .din0-panel {
        width: 360px;
        max-width: min(92vw, 360px);
        border-radius: 16px;
        overflow: hidden;
        background: linear-gradient(180deg, #0f172a, #020617);
        color: var(--din0-text);
        border: 1px solid rgba(148, 163, 184, 0.22);
        box-shadow: 0 20px 50px rgba(2, 6, 23, 0.6);
      }

      .din0-panel-header {
        padding: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(148, 163, 184, 0.2);
      }

      .din0-title-wrap {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .din0-title {
        font-size: 14px;
        letter-spacing: 0.01em;
      }

      .din0-close {
        border: none;
        background: transparent;
        color: #cbd5e1;
        font-size: 14px;
        cursor: pointer;
      }

      .din0-messages {
        height: 320px;
        overflow-y: auto;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: rgba(15, 23, 42, 0.35);
      }

      .din0-message {
        max-width: 88%;
        padding: 10px 12px;
        border-radius: 12px;
        font-size: 13px;
        line-height: 1.45;
        white-space: pre-wrap;
      }

      .din0-message-user {
        align-self: flex-end;
        background: var(--din0-primary);
        color: #ffffff;
        border-bottom-right-radius: 4px;
      }

      .din0-message-assistant {
        align-self: flex-start;
        background: rgba(100, 116, 139, 0.25);
        border-bottom-left-radius: 4px;
      }

      .din0-message-system {
        align-self: center;
        background: rgba(148, 163, 184, 0.2);
        color: #e2e8f0;
        font-size: 12px;
      }

      .din0-quick-actions {
        padding: 10px 12px;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        border-top: 1px solid rgba(148, 163, 184, 0.1);
      }

      .din0-chip {
        border: 1px solid rgba(148, 163, 184, 0.25);
        border-radius: 999px;
        background: transparent;
        color: #cbd5e1;
        padding: 6px 10px;
        font-size: 12px;
        cursor: pointer;
      }

      .din0-composer {
        padding: 10px 12px;
        display: flex;
        gap: 8px;
        align-items: center;
        border-top: 1px solid rgba(148, 163, 184, 0.2);
      }

      .din0-input {
        flex: 1;
        border: 1px solid rgba(148, 163, 184, 0.3);
        border-radius: 10px;
        background: rgba(30, 41, 59, 0.8);
        color: #f8fafc;
        padding: 9px 10px;
        font-size: 13px;
      }

      .din0-input:focus {
        outline: 2px solid rgba(45, 91, 255, 0.4);
        border-color: var(--din0-primary);
      }

      .din0-send,
      .din0-voice {
        border: none;
        border-radius: 10px;
        background: var(--din0-primary);
        color: white;
        padding: 9px 10px;
        font-size: 12px;
        cursor: pointer;
      }

      .din0-voice[disabled] {
        opacity: 0.7;
        cursor: wait;
      }

      .din0-footer {
        padding: 0 12px 10px;
        text-align: right;
        font-size: 11px;
        color: #94a3b8;
      }

      .din0-avatar {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: radial-gradient(circle at 35% 30%, #7dd3fc, #0ea5e9);
      }

      .din0-avatar-md {
        width: 34px;
        height: 34px;
      }

      .din0-avatar-sm {
        width: 20px;
        height: 20px;
      }

      .din0-avatar-eye {
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 999px;
        background: #0f172a;
        top: 8px;
      }

      .din0-avatar-sm .din0-avatar-eye {
        width: 3px;
        height: 3px;
        top: 6px;
      }

      .din0-avatar-eye.left {
        left: 8px;
      }

      .din0-avatar-eye.right {
        right: 8px;
      }

      .din0-avatar-sm .din0-avatar-eye.left {
        left: 5px;
      }

      .din0-avatar-sm .din0-avatar-eye.right {
        right: 5px;
      }

      .din0-avatar-mouth {
        position: absolute;
        width: 12px;
        height: 6px;
        border: 2px solid #0f172a;
        border-top: none;
        border-left: none;
        border-right: none;
        border-radius: 0 0 999px 999px;
        bottom: 7px;
      }

      .din0-avatar-sm .din0-avatar-mouth {
        width: 8px;
        height: 3px;
        bottom: 4px;
      }

      .din0-state-thinking {
        animation: din0-thinking 0.9s ease-in-out infinite;
      }

      .din0-state-talking {
        animation: din0-talking 0.4s ease-in-out infinite;
      }

      .din0-state-happy {
        animation: din0-happy 0.7s ease-in-out 2;
      }

      .din0-state-error {
        animation: din0-error 0.3s linear 2;
      }

      @keyframes din0-thinking {
        0% { transform: translateY(0); }
        50% { transform: translateY(-2px); }
        100% { transform: translateY(0); }
      }

      @keyframes din0-talking {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }

      @keyframes din0-happy {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(8deg); }
        75% { transform: rotate(-8deg); }
        100% { transform: rotate(0deg); }
      }

      @keyframes din0-error {
        0% { transform: translateX(0); }
        25% { transform: translateX(-3px); }
        75% { transform: translateX(3px); }
        100% { transform: translateX(0); }
      }

      @media (max-width: 640px) {
        .din0-root.bottom-right,
        .din0-root.bottom-left {
          left: 12px;
          right: 12px;
          bottom: 12px;
          align-items: stretch;
        }

        .din0-panel {
          width: auto;
          max-width: 100%;
        }

        .din0-messages {
          height: 46vh;
        }

        .din0-launcher {
          align-self: flex-end;
        }
      }
    `}}const p=new Map;function L(i){const t=new U(i);return t.mount(),p.set(t.instanceId,t),{instanceId:t.instanceId,destroy:()=>{t.destroy(),p.delete(t.instanceId)}}}function _(i){if(i){const t=p.get(i);t==null||t.destroy(),p.delete(i);return}for(const[t,e]of p.entries())e.destroy(),p.delete(t)}function z(){return Array.from(p.keys())}const A={init:L,destroy:_,getInstances:z,version:"0.1.0"};return typeof window<"u"&&(window.Din0=A),A})();
