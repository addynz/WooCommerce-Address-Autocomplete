/* 
Neat Complete v1.5.10 (c) 2019 AddressFinder 
https://addressfinder.nz 
https://addressfinder.com.au 
https://github.com/AbleTech/neat-complete/blob/develop/LICENSE.md 
*/
(function () {
    var t = [].slice,
      e = function (t, e) {
        return function () {
          return t.apply(e, arguments);
        };
      },
      i = function (t, e) {
        function i() {
          this.constructor = t;
        }
        for (var n in e) s.call(e, n) && (t[n] = e[n]);
        return (
          (i.prototype = e.prototype),
          (t.prototype = new i()),
          (t.__super__ = e.prototype),
          t
        );
      },
      s = {}.hasOwnProperty;
    !(function (t, e) {
      "function" == typeof define && define.amd
        ? define(function () {
            return e(t);
          })
        : (t.NeatComplete = e(t));
    })(this, function (s) {
      var n;
      return (
        (n = {}),
        (n.VERSION = "1.5.10"),
        (n.addDomEvent = function (t, e, i) {
          var s;
          return t.addEventListener
            ? t.addEventListener(e, i, !1)
            : ((s = function () {
                return i.apply(t, arguments);
              }),
              t.attachEvent("on" + e, s));
        }),
        (n.removeDomEvent = function (t, e, i) {
          t.removeEventListener
            ? t.removeEventListener(e, i, !1)
            : t.detachEvent && t.detachEvent("on" + e, null);
        }),
        (n.addClass = function (t, e) {
          return (
            n.classNameExists(t, e) || ((e = " " + e), (t.className += e)), t
          );
        }),
        (n.removeClass = function (t, e) {
          var i, s, n, o, r;
          for (
            r = [], s = t.className.split(" "), n = 0, o = s.length;
            n < o;
            n++
          )
            (i = s[n]) !== e && r.push(i);
          return (t.className = r.join(" ")), t;
        }),
        (n.classNameExists = function (t, e) {
          var i, s, n;
          for (i = t.className.split(" "), s = 0, n = i.length; s < n; s++)
            if (i[s] === e) return !0;
          return !1;
        }),
        Array.prototype.indexOf ||
          (Array.prototype.indexOf = function (t) {
            var e, i, s, n;
            if (null == this) throw new TypeError();
            if (((n = Object(this)), 0 === (i = n.length >>> 0))) return -1;
            if (
              ((s = 0),
              arguments.length > 0 &&
                ((s = Number(arguments[1])),
                s !== s
                  ? (s = 0)
                  : 0 !== s &&
                    Infinity !== s &&
                    -Infinity !== s &&
                    (s = (s > 0 || -1) * Math.floor(Math.abs(s)))),
              s >= i)
            )
              return -1;
            for (e = s >= 0 ? s : Math.max(i - Math.abs(s), 0); e < i; ) {
              if (e in n && n[e] === t) return e;
              e++;
            }
            return -1;
          }),
        (n.Dispatch = (function () {
          function e() {}
          return (
            (e.prototype.setOption = function (t, e) {
              return (this.options[t] = e), this;
            }),
            (e.prototype.getOption = function (t) {
              return this.options[t];
            }),
            (e.prototype.on = function (t, e) {
              var i;
              return (
                null == this.subs && (this.subs = {}),
                null == (i = this.subs)[t] && (i[t] = []),
                this.subs[t].push(e),
                this
              );
            }),
            (e.prototype.trigger = function () {
              var e, i, s, n, o, r, h;
              if (
                ((s = arguments[0]),
                (e = 2 <= arguments.length ? t.call(arguments, 1) : []),
                null != (null != (r = this.subs) ? r[s] : void 0))
              )
                for (h = this.subs[s], n = 0, o = h.length; n < o; n++)
                  (i = h[n]), i.apply(this, e);
              return this;
            }),
            e
          );
        })()),
        (n.Widget = (function (t) {
          function s(t, i) {
            (this.element = t),
              (this.options = null != i ? i : {}),
              (this._onPaste = e(this._onPaste, this)),
              (this._onBlur = e(this._onBlur, this)),
              (this._onKeyDown = e(this._onKeyDown, this)),
              (this._onKeyPress = e(this._onKeyPress, this)),
              (this._onFocus = e(this._onFocus, this)),
              (this.enabled = !0),
              (this.searchQueued = !1),
              this.element.getAttribute("autocomplete") ||
                this.element.setAttribute("autocomplete", "off"),
              (this.services = []),
              this._applyDefaults(),
              null == this.getOption("container") &&
                this.setOption("container", window.document.body),
              this._addListeners(),
              (this.output = document.createElement("ul")),
              (this.output.className = this.options.list_class),
              this._applyStyle("display", "none"),
              this._applyStyle("position", this.options.position),
              this.options.container.appendChild(this.output);
          }
          return (
            i(s, t),
            (s.prototype.defaults = {
              max_results: 10,
              list_class: "nc_list",
              item_class: "nc_item",
              hover_class: "nc_hover",
              footer_class: "nc_footer",
              empty_class: "nc_empty",
              error_class: "nc_error",
              icon_class: "nc_icon",
              hidden_icon_class: "nc_hidden",
              position: "absolute",
              timeout: 400,
              ignore_returns: !0,
            }),
            (s.prototype.addService = function (t, e, i) {
              var s;
              return (
                null == i && (i = {}),
                this.services.push((s = new n.Service(this, t, e, i))),
                s
              );
            }),
            (s.prototype.disable = function () {
              return (
                (this.enabled = !1),
                this.icon &&
                  n.addClass(this.icon, this.options.hidden_icon_class),
                (this.output.innerHTML = ""),
                this
              );
            }),
            (s.prototype.enable = function () {
              return (
                (this.enabled = !0),
                this.icon &&
                  n.removeClass(this.icon, this.options.hidden_icon_class),
                this
              );
            }),
            (s.prototype.destroy = function () {
              document.body.removeChild(this.output),
                this.element.removeAttribute("autocomplete"),
                this.icon &&
                  (document.body.removeChild(this.icon),
                  window.removeEventListener("resize", this._resetIconPosition));
            }),
            (s.prototype._applyDefaults = function () {
              var t, e, i, s;
              (e = this.defaults), (i = []);
              for (t in e)
                (s = e[t]),
                  null == this.getOption(t)
                    ? i.push(this.setOption(t, s))
                    : i.push(void 0);
              return i;
            }),
            (s.prototype._addListeners = function () {
              return (
                n.addDomEvent(this.element, "focus", this._onFocus),
                n.addDomEvent(this.element, "keypress", this._onKeyPress),
                n.addDomEvent(this.element, "keydown", this._onKeyDown),
                n.addDomEvent(this.element, "blur", this._onBlur),
                n.addDomEvent(this.element, "paste", this._onPaste)
              );
            }),
            (s.prototype._removeListeners = function () {
              return (
                n.removeDomEvent(this.element, "focus", this._onFocus),
                n.removeDomEvent(this.element, "keypress", this._onKeyPress),
                n.removeDomEvent(this.element, "keydown", this._onKeyDown),
                n.removeDomEvent(this.element, "blur", this._onBlur),
                n.removeDomEvent(this.element, "paste", this._onPaste)
              );
            }),
            (s.prototype._onFocus = function (t) {
              return (this.focused = !0);
            }),
            (s.prototype._onKeyPress = function (t) {
              var e, i, s;
              if (((i = t.which || t.keyCode), this.visible && 13 === i))
                return (
                  null != (s = this.highlighted) && s.selectItem(),
                  (e = this.getOption("ignore_returns")),
                  e && t.preventDefault
                    ? t.preventDefault()
                    : e && (t.returnValue = !1),
                  (this.highlighted = null)
                );
            }),
            (s.prototype._onKeyDown = function (t) {
              var e;
              switch (t.which || t.keyCode) {
                case 38:
                  return this.visible && this._moveHighlight(-1), !1;
                case 40:
                  return this.visible && this._moveHighlight(1), !1;
                case 9:
                  if (this.visible)
                    return null != (e = this.highlighted)
                      ? e.selectItem()
                      : void 0;
                  break;
                case 27:
                  return this._hideResults();
                case 37:
                case 39:
                case 13:
                  break;
                default:
                  return this._getSuggestionsWithTimeout();
              }
            }),
            (s.prototype._onBlur = function (t) {
              if (!this.mouseDownOnSelect)
                return (this.focused = !1), this._hideResults();
            }),
            (s.prototype._onPaste = function (t) {
              return this._getSuggestionsWithTimeout();
            }),
            (s.prototype._moveHighlight = function (t) {
              var e, i, s, n;
              return (
                (e =
                  null != this.highlighted
                    ? this.results.indexOf(this.highlighted)
                    : -1),
                null != (s = this.highlighted) && s.unhighlight(),
                (e += t),
                e < -1
                  ? (e = this.results.length - 1)
                  : e >= this.results.length && (e = -1),
                null != (n = this.results[e]) && n.highlight(),
                (i = void 0 !== this._val ? this._val : ""),
                (this.element.value =
                  null != this.highlighted ? this.highlighted.value : i)
              );
            }),
            (s.prototype._getSuggestionsWithTimeout = function () {
              return (
                null != this._timeout && clearTimeout(this._timeout),
                (this._timeout = setTimeout(
                  (function (t) {
                    return function () {
                      return t._getSuggestions();
                    };
                  })(this),
                  this.options.timeout
                ))
              );
            }),
            (s.prototype._getSuggestions = function () {
              var t, e, i, s, n;
              if (this.enabled) {
                if (!this._servicesReady()) return void (this.searchQueued = !0);
                if (
                  ((this._val = this.element.value),
                  (this.error_content = null),
                  "" !== this._val)
                ) {
                  for (i = this.services, s = [], t = 0, e = i.length; t < e; t++)
                    (n = i[t]), s.push(n.search(this._val));
                  return s;
                }
                return this._hideResults();
              }
            }),
            (s.prototype._applyStyle = function (t, e) {
              return (this.output.style[t] = e);
            }),
            (s.prototype._getVerticalOffset = function () {
              return (
                window.pageYOffset ||
                (document.documentElement && document.documentElement.scrollTop)
              );
            }),
            (s.prototype._getPosition = function () {
              var t, e;
              return (
                (t = this.element),
                (e = this._getVerticalOffset()),
                {
                  top: e + t.getBoundingClientRect().top + t.offsetHeight,
                  left: t.getBoundingClientRect().left,
                }
              );
            }),
            (s.prototype._hideResults = function () {
              var t, e, i, s, n;
              for (
                this.visible = !1,
                  this._applyStyle("display", "none"),
                  this.results = [],
                  i = this.services,
                  s = [],
                  t = 0,
                  e = i.length;
                t < e;
                t++
              )
                (n = i[t]), s.push((n.results = []));
              return s;
            }),
            (s.prototype._displayResults = function () {
              var t;
              return (
                (this.visible = !0),
                (t = this._getPosition()),
                this.options.container === document.body &&
                  (this._applyStyle("left", t.left + "px"),
                  this._applyStyle("top", t.top + "px")),
                this._applyStyle("display", "block")
              );
            }),
            (s.prototype._renderItem = function (t, e) {
              var i;
              return (
                (i = document.createElement("li")),
                (i.innerHTML = t),
                null != e && (i.className = e),
                n.addDomEvent(
                  i,
                  "mousedown",
                  (function (t) {
                    return function () {
                      return (t.mouseDownOnSelect = !0);
                    };
                  })(this)
                ),
                n.addDomEvent(
                  i,
                  "mouseup",
                  (function (t) {
                    return function () {
                      return (t.mouseDownOnSelect = !1);
                    };
                  })(this)
                ),
                i
              );
            }),
            (s.prototype._renderFooter = function () {
              return this._renderItem(
                this.options.footer_content,
                this.options.footer_class
              );
            }),
            (s.prototype._renderEmpty = function () {
              return this._renderItem(
                this.options.empty_content,
                this.options.empty_class
              );
            }),
            (s.prototype._servicesReady = function () {
              var t, e, i, s, n;
              for (n = [], i = this.services, t = 0, e = i.length; t < e; t++)
                (s = i[t]), n.push(s.ready());
              return n.indexOf(!1) < 0;
            }),
            (s.prototype.showResults = function () {
              var t, e, i, s, n, o, r, h, u;
              if (this._servicesReady()) {
                for (
                  this.searchQueued &&
                    (this._getSuggestions(), (this.searchQueued = !1)),
                    this.results = [],
                    this.output.innerHTML = "",
                    o = this.services,
                    e = 0,
                    s = o.length;
                  e < s;
                  e++
                )
                  (u = o[e]), (this.results = this.results.concat(u.results));
                if (this.results.length) {
                  for (
                    this.results = this.results.sort(function (t, e) {
                      return e.score - t.score;
                    }),
                      this.results = this.results.slice(
                        0,
                        +(this.getOption("max_results") - 1) + 1 || 9e9
                      ),
                      r = this.results,
                      i = 0,
                      n = r.length;
                    i < n;
                    i++
                  )
                    (h = r[i]), this.output.appendChild(h.render());
                  null != this.options.footer_content &&
                    "" !== (t = this._renderFooter()) &&
                    this.output.appendChild(t),
                    this._displayResults();
                } else
                  this.error_content
                    ? (this.output.appendChild(
                        this._renderItem(
                          this.error_content,
                          this.options.error_class
                        )
                      ),
                      this._displayResults())
                    : (null != this.options.empty_content
                        ? (this.output.appendChild(this._renderEmpty()),
                          this._displayResults())
                        : this._hideResults(),
                      this.trigger("results:empty"));
                this.trigger("results:update");
              }
            }),
            (s.prototype.selectHighlighted = function () {
              (this.element.value = this.highlighted.value),
                this._hideResults(),
                this.trigger(
                  "result:select",
                  this.highlighted.value,
                  this.highlighted.data
                ),
                this._dispatchDOMChangeEvent();
            }),
            (s.prototype._dispatchDOMChangeEvent = function () {
              var t;
              if ("function" == typeof Event)
                t = new Event("change", { bubbles: !0, cancellable: !0 });
              else {
                if (void 0 === document.createEvent) return;
                (t = document.createEvent("Event")),
                  t.initEvent("change", !0, !0);
              }
              return this.element.dispatchEvent(t);
            }),
            (s.prototype.setIcon = function (t, e) {
              var i, s, o;
              return (
                this.removeIcon(t),
                (s = t.class || "nc_icon"),
                (i = document.createElement("a")),
                n.addClass(i, s),
                (o = this._calculateIconPosition()),
                (i.style.top = o.coords.top + "px"),
                (i.style.left = o.coords.left + "px"),
                (i.style.height = o.size + "px"),
                (i.style.width = o.size + "px"),
                i.addEventListener("click", e),
                (this._resetIconPosition = this.setIcon.bind(this, t, e)),
                window.addEventListener("resize", this._resetIconPosition),
                this.options.container.appendChild(i),
                (this.icon = i)
              );
            }),
            (s.prototype.removeIcon = function (t) {
              return (
                this.icon &&
                  (this.icon.parentNode.removeChild(this.icon),
                  window.removeEventListener("resize", this._resetIconPosition)),
                (this.icon = null)
              );
            }),
            (s.prototype._calculateIconPosition = function () {
              var t, e, i, s, n;
              return (
                (n = this.element.offsetWidth),
                (i = this.element.offsetHeight),
                (s = this._getPosition()),
                (e = i / 2),
                (t = e / 2.4),
                {
                  coords: { top: s.top - e - t, left: s.left + n - e - t },
                  size: e,
                }
              );
            }),
            (s.prototype.setInfoPanel = function (t, e) {
              var i, s;
              return (
                (e = e || {}),
                (i = e.class || "af_info_panel"),
                !1 === e.persistant
                  ? ((this.output.innerHTML = ""),
                    (s = this._renderItem(t, i)),
                    e.cancellable && this._addCancelButton(s, e),
                    this.output.appendChild(s),
                    this._displayResults())
                  : ((this.infoPanel = {}),
                    (this.infoPanel.content = t),
                    (this.infoPanel.options = e))
              );
            }),
            (s.prototype._addCancelButton = function (t, e) {
              var i, s, o;
              return (
                (o = navigator.userAgent),
                (i = o.indexOf("MSIE ") > -1 || o.indexOf("Trident/") > -1),
                (s = document.createElement("span")),
                n.addClass(s, "cancel_button"),
                i && n.addClass(s, "IE"),
                s.addEventListener(
                  "click",
                  function () {
                    return (this.output.innerHTML = ""), e.cancelHandler();
                  }.bind(this)
                ),
                t.appendChild(s)
              );
            }),
            s
          );
        })(n.Dispatch)),
        (n.Service = (function (t) {
          function s(t, i, s, n) {
            (this.widget = t),
              (this.name = i),
              (this.search_fn = s),
              (this.options = null != n ? n : {}),
              (this._response = e(this._response, this)),
              (this.ready = e(this.ready, this)),
              (this.results = []),
              (this._ready = !0),
              (this.response = (function (t) {
                return function (e, i) {
                  return t._response.apply(t, arguments);
                };
              })(this));
          }
          return (
            i(s, t),
            (s.prototype.ready = function () {
              return this._ready;
            }),
            (s.prototype.search = function (t) {
              return (
                (this.last_query = t),
                (this._ready = !1),
                this.search_fn(t, this.response)
              );
            }),
            (s.prototype._response = function (t, e) {
              var i, s, o;
              if (((this.results = []), this.last_query === t)) {
                for (this.results = [], s = 0, o = e.length; s < o; s++)
                  (i = e[s]), this.results.push(new n._Result(this, i));
                return (this._ready = !0), this.widget.showResults();
              }
            }),
            s
          );
        })(n.Dispatch)),
        (n._Result = (function () {
          function t(t, e) {
            var i, s, n, o;
            (this.service = t),
              (this.options = e),
              (this.widget = this.service.widget),
              (this.renderer =
                this.service.options.renderer || this.widget.options.renderer),
              (this.value = null != (i = this.options) ? i.value : void 0),
              (this.score = (null != (s = this.options) ? s.score : void 0) || 0),
              (this.identifier =
                null != (n = this.options) ? n.identifier : void 0),
              (this.data = (null != (o = this.options) ? o.data : void 0) || {});
          }
          return (
            (t.prototype.render = function () {
              return (
                (this.li = document.createElement("li")),
                (this.li.innerHTML =
                  null != this.renderer
                    ? this.renderer(this.value, this.data)
                    : this.value),
                (this.li.className = this.widget.options.item_class),
                this.addEvents(),
                this.li
              );
            }),
            (t.prototype.addEvents = function () {
              return (
                n.addDomEvent(
                  this.li,
                  "click",
                  (function (t) {
                    return function (e) {
                      return (
                        t.selectItem(),
                        e.preventDefault
                          ? e.preventDefault()
                          : (e.returnValue = !1)
                      );
                    };
                  })(this)
                ),
                n.addDomEvent(
                  this.li,
                  "mouseover",
                  (function (t) {
                    return function () {
                      return t.highlight();
                    };
                  })(this)
                ),
                n.addDomEvent(
                  this.li,
                  "mouseout",
                  (function (t) {
                    return function () {
                      return t.unhighlight();
                    };
                  })(this)
                ),
                n.addDomEvent(
                  this.li,
                  "mousedown",
                  (function (t) {
                    return function () {
                      return (t.widget.mouseDownOnSelect = !0);
                    };
                  })(this)
                ),
                n.addDomEvent(
                  this.li,
                  "mouseup",
                  (function (t) {
                    return function () {
                      return (t.widget.mouseDownOnSelect = !1);
                    };
                  })(this)
                )
              );
            }),
            (t.prototype.selectItem = function () {
              return (
                this.service.trigger("result:select", this.value, this.data),
                (this.widget.highlighted = this),
                this.widget.selectHighlighted()
              );
            }),
            (t.prototype.highlight = function () {
              var t;
              return (
                null != (t = this.widget.highlighted) && t.unhighlight(),
                (this.li.className =
                  this.li.className + " " + this.widget.options.hover_class),
                (this.widget.highlighted = this)
              );
            }),
            (t.prototype.unhighlight = function () {
              return (
                (this.widget.highlighted = null),
                (this.li.className = this.li.className.replace(
                  new RegExp(this.widget.options.hover_class, "gi"),
                  ""
                ))
              );
            }),
            t
          );
        })()),
        n
      );
    });
  }).call(this);
  /*! Reqwest! A general purpose XHR connection manager license MIT (c) Dustin Diaz 2015 https://github.com/ded/reqwest */
  !(function (e, t, n) {
    typeof module != "undefined" && module.exports
      ? (module.exports = n())
      : typeof define == "function" && define.amd
      ? define(n)
      : (t[e] = n());
  })("reqwest", this, function () {
    function succeed(e) {
      var t = protocolRe.exec(e.url);
      return (
        (t = (t && t[1]) || context.location.protocol),
        httpsRe.test(t) ? twoHundo.test(e.request.status) : !!e.request.response
      );
    }
    function handleReadyState(e, t, n) {
      return function () {
        if (e._aborted) return n(e.request);
        if (e._timedOut) return n(e.request, "Request is aborted: timeout");
        e.request &&
          e.request[readyState] == 4 &&
          ((e.request.onreadystatechange = noop),
          succeed(e) ? t(e.request) : n(e.request));
      };
    }
    function setHeaders(e, t) {
      var n = t.headers || {},
        r;
      n.Accept =
        n.Accept || defaultHeaders.accept[t.type] || defaultHeaders.accept["*"];
      var i = typeof FormData != "undefined" && t.data instanceof FormData;
      !t.crossOrigin &&
        !n[requestedWith] &&
        (n[requestedWith] = defaultHeaders.requestedWith),
        !n[contentType] &&
          !i &&
          (n[contentType] = t.contentType || defaultHeaders.contentType);
      for (r in n)
        n.hasOwnProperty(r) &&
          "setRequestHeader" in e &&
          e.setRequestHeader(r, n[r]);
    }
    function setCredentials(e, t) {
      typeof t.withCredentials != "undefined" &&
        typeof e.withCredentials != "undefined" &&
        (e.withCredentials = !!t.withCredentials);
    }
    function generalCallback(e) {
      lastValue = e;
    }
    function urlappend(e, t) {
      return e + (/\?/.test(e) ? "&" : "?") + t;
    }
    function handleJsonp(e, t, n, r) {
      var i = uniqid++,
        s = e.jsonpCallback || "callback",
        o = e.jsonpCallbackName || reqwest.getcallbackPrefix(i),
        u = new RegExp("((^|\\?|&)" + s + ")=([^&]+)"),
        a = r.match(u),
        f = doc.createElement("script"),
        l = 0,
        c = navigator.userAgent.indexOf("MSIE 10.0") !== -1;
      return (
        a
          ? a[3] === "?"
            ? (r = r.replace(u, "$1=" + o))
            : (o = a[3])
          : (r = urlappend(r, s + "=" + o)),
        (context[o] = generalCallback),
        (f.type = "text/javascript"),
        (f.src = r),
        (f.async = !0),
        typeof f.onreadystatechange != "undefined" &&
          !c &&
          (f.htmlFor = f.id = "_reqwest_" + i),
        (f.onload = f.onreadystatechange =
          function () {
            if (
              (f[readyState] &&
                f[readyState] !== "complete" &&
                f[readyState] !== "loaded") ||
              l
            )
              return !1;
            (f.onload = f.onreadystatechange = null),
              f.onclick && f.onclick(),
              t(lastValue),
              (lastValue = undefined),
              head.removeChild(f),
              (l = 1);
          }),
        head.appendChild(f),
        {
          abort: function () {
            (f.onload = f.onreadystatechange = null),
              n({}, "Request is aborted: timeout", {}),
              (lastValue = undefined),
              head.removeChild(f),
              (l = 1);
          },
        }
      );
    }
    function getRequest(e, t) {
      var n = this.o,
        r = (n.method || "GET").toUpperCase(),
        i = typeof n == "string" ? n : n.url,
        s =
          n.processData !== !1 && n.data && typeof n.data != "string"
            ? reqwest.toQueryString(n.data)
            : n.data || null,
        o,
        u = !1;
      return (
        (n["type"] == "jsonp" || r == "GET") &&
          s &&
          ((i = urlappend(i, s)), (s = null)),
        n["type"] == "jsonp"
          ? handleJsonp(n, e, t, i)
          : ((o = (n.xhr && n.xhr(n)) || xhr(n)),
            o.open(r, i, n.async === !1 ? !1 : !0),
            setHeaders(o, n),
            setCredentials(o, n),
            context[xDomainRequest] && o instanceof context[xDomainRequest]
              ? ((o.onload = e),
                (o.onerror = t),
                (o.onprogress = function () {}),
                (u = !0))
              : (o.onreadystatechange = handleReadyState(this, e, t)),
            n.before && n.before(o),
            u
              ? setTimeout(function () {
                  o.send(s);
                }, 200)
              : o.send(s),
            o)
      );
    }
    function Reqwest(e, t) {
      (this.o = e), (this.fn = t), init.apply(this, arguments);
    }
    function setType(e) {
      if (e === null) return undefined;
      if (e.match("json")) return "json";
      if (e.match("javascript")) return "js";
      if (e.match("text")) return "html";
      if (e.match("xml")) return "xml";
    }
    function init(o, fn) {
      function complete(e) {
        o.timeout && clearTimeout(self.timeout), (self.timeout = null);
        while (self._completeHandlers.length > 0)
          self._completeHandlers.shift()(e);
      }
      function success(resp) {
        var type =
          o.type || (resp && setType(resp.getResponseHeader("Content-Type")));
        resp = type !== "jsonp" ? self.request : resp;
        var filteredResponse = globalSetupOptions.dataFilter(
            resp.responseText,
            type
          ),
          r = filteredResponse;
        try {
          resp.responseText = r;
        } catch (e) {}
        if (r)
          switch (type) {
            case "json":
              try {
                resp = context.JSON ? context.JSON.parse(r) : eval("(" + r + ")");
              } catch (err) {
                return error(resp, "Could not parse JSON in response", err);
              }
              break;
            case "js":
              resp = eval(r);
              break;
            case "html":
              resp = r;
              break;
            case "xml":
              resp =
                resp.responseXML &&
                resp.responseXML.parseError &&
                resp.responseXML.parseError.errorCode &&
                resp.responseXML.parseError.reason
                  ? null
                  : resp.responseXML;
          }
        (self._responseArgs.resp = resp),
          (self._fulfilled = !0),
          fn(resp),
          self._successHandler(resp);
        while (self._fulfillmentHandlers.length > 0)
          resp = self._fulfillmentHandlers.shift()(resp);
        complete(resp);
      }
      function timedOut() {
        (self._timedOut = !0), self.request.abort();
      }
      function error(e, t, n) {
        (e = self.request),
          (self._responseArgs.resp = e),
          (self._responseArgs.msg = t),
          (self._responseArgs.t = n),
          (self._erred = !0);
        while (self._errorHandlers.length > 0)
          self._errorHandlers.shift()(e, t, n);
        complete(e);
      }
      (this.url = typeof o == "string" ? o : o.url),
        (this.timeout = null),
        (this._fulfilled = !1),
        (this._successHandler = function () {}),
        (this._fulfillmentHandlers = []),
        (this._errorHandlers = []),
        (this._completeHandlers = []),
        (this._erred = !1),
        (this._responseArgs = {});
      var self = this;
      (fn = fn || function () {}),
        o.timeout &&
          (this.timeout = setTimeout(function () {
            timedOut();
          }, o.timeout)),
        o.success &&
          (this._successHandler = function () {
            o.success.apply(o, arguments);
          }),
        o.error &&
          this._errorHandlers.push(function () {
            o.error.apply(o, arguments);
          }),
        o.complete &&
          this._completeHandlers.push(function () {
            o.complete.apply(o, arguments);
          }),
        (this.request = getRequest.call(this, success, error));
    }
    function reqwest(e, t) {
      return new Reqwest(e, t);
    }
    function normalize(e) {
      return e ? e.replace(/\r?\n/g, "\r\n") : "";
    }
    function serial(e, t) {
      var n = e.name,
        r = e.tagName.toLowerCase(),
        i = function (e) {
          e &&
            !e.disabled &&
            t(
              n,
              normalize(
                e.attributes.value && e.attributes.value.specified
                  ? e.value
                  : e.text
              )
            );
        },
        s,
        o,
        u,
        a;
      if (e.disabled || !n) return;
      switch (r) {
        case "input":
          /reset|button|image|file/i.test(e.type) ||
            ((s = /checkbox/i.test(e.type)),
            (o = /radio/i.test(e.type)),
            (u = e.value),
            ((!s && !o) || e.checked) &&
              t(n, normalize(s && u === "" ? "on" : u)));
          break;
        case "textarea":
          t(n, normalize(e.value));
          break;
        case "select":
          if (e.type.toLowerCase() === "select-one")
            i(e.selectedIndex >= 0 ? e.options[e.selectedIndex] : null);
          else
            for (a = 0; e.length && a < e.length; a++)
              e.options[a].selected && i(e.options[a]);
      }
    }
    function eachFormElement() {
      var e = this,
        t,
        n,
        r = function (t, n) {
          var r, i, s;
          for (r = 0; r < n.length; r++) {
            s = t[byTag](n[r]);
            for (i = 0; i < s.length; i++) serial(s[i], e);
          }
        };
      for (n = 0; n < arguments.length; n++)
        (t = arguments[n]),
          /input|select|textarea/i.test(t.tagName) && serial(t, e),
          r(t, ["input", "select", "textarea"]);
    }
    function serializeQueryString() {
      return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments));
    }
    function serializeHash() {
      var e = {};
      return (
        eachFormElement.apply(function (t, n) {
          t in e
            ? (e[t] && !isArray(e[t]) && (e[t] = [e[t]]), e[t].push(n))
            : (e[t] = n);
        }, arguments),
        e
      );
    }
    function buildParams(e, t, n, r) {
      var i,
        s,
        o,
        u = /\[\]$/;
      if (isArray(t))
        for (s = 0; t && s < t.length; s++)
          (o = t[s]),
            n || u.test(e)
              ? r(e, o)
              : buildParams(
                  e + "[" + (typeof o == "object" ? s : "") + "]",
                  o,
                  n,
                  r
                );
      else if (t && t.toString() === "[object Object]")
        for (i in t) buildParams(e + "[" + i + "]", t[i], n, r);
      else r(e, t);
    }
    var context = this;
    if ("window" in context)
      var doc = document,
        byTag = "getElementsByTagName",
        head = doc[byTag]("head")[0];
    else {
      var XHR2;
      try {
        XHR2 = require("xhr2");
      } catch (ex) {
        throw new Error(
          "Peer dependency `xhr2` required! Please npm install xhr2"
        );
      }
    }
    var httpsRe = /^http/,
      protocolRe = /(^\w+):\/\//,
      twoHundo = /^(20\d|1223)$/,
      readyState = "readyState",
      contentType = "Content-Type",
      requestedWith = "X-Requested-With",
      uniqid = 0,
      callbackPrefix = "reqwest_" + +new Date(),
      lastValue,
      xmlHttpRequest = "XMLHttpRequest",
      xDomainRequest = "XDomainRequest",
      noop = function () {},
      isArray =
        typeof Array.isArray == "function"
          ? Array.isArray
          : function (e) {
              return e instanceof Array;
            },
      defaultHeaders = {
        contentType: "application/x-www-form-urlencoded",
        requestedWith: xmlHttpRequest,
        accept: {
          "*": "text/javascript, text/html, application/xml, text/xml, */*",
          xml: "application/xml, text/xml",
          html: "text/html",
          text: "text/plain",
          json: "application/json, text/javascript",
          js: "application/javascript, text/javascript",
        },
      },
      xhr = function (e) {
        if (e.crossOrigin === !0) {
          var t = context[xmlHttpRequest] ? new XMLHttpRequest() : null;
          if (t && "withCredentials" in t) return t;
          if (context[xDomainRequest]) return new XDomainRequest();
          throw new Error("Browser does not support cross-origin requests");
        }
        return context[xmlHttpRequest]
          ? new XMLHttpRequest()
          : XHR2
          ? new XHR2()
          : new ActiveXObject("Microsoft.XMLHTTP");
      },
      globalSetupOptions = {
        dataFilter: function (e) {
          return e;
        },
      };
    return (
      (Reqwest.prototype = {
        abort: function () {
          (this._aborted = !0), this.request.abort();
        },
        retry: function () {
          init.call(this, this.o, this.fn);
        },
        then: function (e, t) {
          return (
            (e = e || function () {}),
            (t = t || function () {}),
            this._fulfilled
              ? (this._responseArgs.resp = e(this._responseArgs.resp))
              : this._erred
              ? t(
                  this._responseArgs.resp,
                  this._responseArgs.msg,
                  this._responseArgs.t
                )
              : (this._fulfillmentHandlers.push(e), this._errorHandlers.push(t)),
            this
          );
        },
        always: function (e) {
          return (
            this._fulfilled || this._erred
              ? e(this._responseArgs.resp)
              : this._completeHandlers.push(e),
            this
          );
        },
        fail: function (e) {
          return (
            this._erred
              ? e(
                  this._responseArgs.resp,
                  this._responseArgs.msg,
                  this._responseArgs.t
                )
              : this._errorHandlers.push(e),
            this
          );
        },
        catch: function (e) {
          return this.fail(e);
        },
      }),
      (reqwest.serializeArray = function () {
        var e = [];
        return (
          eachFormElement.apply(function (t, n) {
            e.push({ name: t, value: n });
          }, arguments),
          e
        );
      }),
      (reqwest.serialize = function () {
        if (arguments.length === 0) return "";
        var e,
          t,
          n = Array.prototype.slice.call(arguments, 0);
        return (
          (e = n.pop()),
          e && e.nodeType && n.push(e) && (e = null),
          e && (e = e.type),
          e == "map"
            ? (t = serializeHash)
            : e == "array"
            ? (t = reqwest.serializeArray)
            : (t = serializeQueryString),
          t.apply(null, n)
        );
      }),
      (reqwest.toQueryString = function (e, t) {
        var n,
          r,
          i = t || !1,
          s = [],
          o = encodeURIComponent,
          u = function (e, t) {
            (t = "function" == typeof t ? t() : t == null ? "" : t),
              (s[s.length] = o(e) + "=" + o(t));
          };
        if (isArray(e))
          for (r = 0; e && r < e.length; r++) u(e[r].name, e[r].value);
        else for (n in e) e.hasOwnProperty(n) && buildParams(n, e[n], i, u);
        return s.join("&").replace(/%20/g, "+");
      }),
      (reqwest.getcallbackPrefix = function () {
        return callbackPrefix;
      }),
      (reqwest.compat = function (e, t) {
        return (
          e &&
            (e.type && (e.method = e.type) && delete e.type,
            e.dataType && (e.type = e.dataType),
            e.jsonpCallback &&
              (e.jsonpCallbackName = e.jsonpCallback) &&
              delete e.jsonpCallback,
            e.jsonp && (e.jsonpCallback = e.jsonp)),
          new Reqwest(e, t)
        );
      }),
      (reqwest.ajaxSetup = function (e) {
        e = e || {};
        for (var t in e) globalSetupOptions[t] = e[t];
      }),
      reqwest
    );
  });
  // AddyComplete v2.3.0 - https://www.addy.co.nz
  function AddyUrlSettingFactory(e) {
    function t(e) {
      e = e.replace(/[\[\]]/g, "\\$&");
      var t = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(o);
      return t
        ? t[2]
          ? decodeURIComponent(t[2].replace(/\+/g, " "))
          : ""
        : null;
    }
    (this.createOptions = function () {
      var e = {};
      return (
        (e.excludePostBox = t("excludePostBox") || !1),
        (e.exRural = t("excludeRural") || !1),
        (e.exUndeliver = t("excludeUndeliver") || !1),
        (e.exSpelling = t("excludeSpelling") || !1),
        (e.exWord = t("excludeWord") || !1),
        (e.exIp = t("excludeIp") || !1),
        (e.exPostcodes = t("excludePostcodes") || ""),
        (e.inPostcode = t("includePostcode") || ""),
        (e.exRegion = t("excludeRegion") || ""),
        (e.inRegion = t("includeRegion") || ""),
        (e.exTerritory = t("excludeTerritory") || ""),
        (e.inTerritory = t("includeTerritory") || ""),
        (e.tag = t("tag") || ""),
        (e.uniqueId = t("uniqueid") || ""),
        (e.maxItems = t("maxItems") || 10),
        (e.enableLocation = !!t("enableLocation") && navigator.geolocation),
        e
      );
    }),
      (this.getKey = function () {
        return t("key");
      }),
      (this.createCallback = function () {
        var e = t("callback");
        return e && "function" == typeof window[e] ? e : null;
      }),
      (this.getLoadCssEnabled = function () {
        var e = t("loadcss");
        return e && "true" === e;
      }),
      (this.createGuid = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (e) {
            var t = (16 * Math.random()) | 0;
            return ("x" == e ? t : (3 & t) | 8).toString(16);
          }
        );
      });
    var o = (function () {
      var t = document.getElementsByTagName("script");
      e = e.toLowerCase();
      for (var o = 0; o < t.length; o++)
        if (t[o].src && -1 !== t[o].src.toLowerCase().indexOf(e)) return t[o].src;
      return console.warn("Script source not found. Name: ", e), "";
    })();
  }
  var addySettingsFactory = new AddyUrlSettingFactory("addy");
  function AddyComplete(e, t) {
    if (e) {
      var o = this;
      (o.urlBase = "https://api.addy.co.nz/"),
        (o.searchSuffix = ""),
        (o.requestSuffix = ""),
        (o.fields = t || {}),
        (o.mode = "address"),
        (o.options = addySettingsFactory.createOptions()),
        (o.key = addySettingsFactory.getKey());
      var i = addySettingsFactory.createGuid(),
        n = e.placeholder;
      (o.makeRequest = function (e, t, n, s) {
        reqwest({
          url:
            o.urlBase +
            e +
            "?key=" +
            o.key +
            o.requestSuffix +
            "&v=neat_2_2_0&session=" +
            i +
            t,
          crossOrigin: !0,
          success: function (e) {
            n && n(e);
          },
          error: function (e) {
            console.warn("Request failed: ", e), s && s(e);
          },
        });
      }),
        (o.searchRequest = function (e, t, i) {
          o.makeRequest(
            e,
            t,
            function (e) {
              i(e), o.service.endSearch();
            },
            function (e) {
              o.widget &&
                ((o.widget.error_content =
                  '"Request Failed:\n' + (e.message || e)),
                o.service.endSearch());
            }
          );
        }),
        (o.widget = new NeatComplete.Widget(e, {
          empty_content:
            "<b>Address not found.</b> Please verify the spelling.<br />For brand new addresses, please type it in manually.",
          location_content: "Addresses near me",
          location_unavailable:
            "Location information unavailable. Please type in your address.",
          location_not_found:
            "No nearby addresses found. Please type in your address.",
          location_loading: "Loading your location...",
          max_results: o.options.maxItems,
          timeout: 50,
        }));
      var s = null;
      (o.service = o.widget.addService(
        "addy",
        function (e, t) {
          try {
            s = new RegExp(
              "(" +
                (function (e) {
                  return e
                    .replace(/\\/gi, "/")
                    .replace(/[^0-9a-z' \/]/gi, "")
                    .trim();
                })(e)
                  .split(" ")
                  .join("|") +
                ")",
              "gi"
            );
          } catch (e) {
            s = null;
          }
          "address" === o.mode
            ? o.searchRequest("search", o.searchSuffix + "&s=" + e, function (o) {
                var i = new Array();
                if (o)
                  for (var n = 0; n < o.addresses.length; n++)
                    i.push({ value: o.addresses[n].a, data: o.addresses[n] });
                t(e, i);
              })
            : o.searchRequest(
                "postcode",
                "&max=" + o.getMaxResults() + "&s=" + e,
                function (o) {
                  var i = new Array();
                  if (o)
                    for (var n = 0; n < o.postcodes.length; n++) {
                      var s = o.postcodes[n];
                      i.push({
                        value:
                          s.suburb +
                          ("" === s.suburb ? "" : ", ") +
                          s.city +
                          ("" === s.city ? "" : ", ") +
                          s.postcode,
                        data: s,
                      });
                    }
                  t(e, i);
                }
              );
        },
        {
          renderer: function (e, t) {
            var i = o.widget.getOption("highlight_class");
            return null === s
              ? e
              : e.replace(
                  s,
                  '<span class="' +
                    (void 0 === i ? "nc_highlight" : i) +
                    '">$1</span>'
                );
          },
        }
      )),
        (o.service.timer = null),
        (o.service.endSearch = function () {
          this.timer && clearTimeout(this.timer), (this._ready = !0);
        }),
        (o.service.search = function (e) {
          if (!(e.length < 3))
            return (
              (o.widget.error_content = null),
              (this.last_query = e),
              (this._ready = !1),
              (this.timer = setTimeout(function () {
                this._ready = !0;
              }, 3200)),
              this.search_fn(e, this.response)
            );
        }),
        (o.setOption = function (e, t) {
          e && "exclude_postbox" === e
            ? (o.options.excludePostBox = t)
            : o.widget.setOption(e, t),
            r();
        }),
        (o.setExcludeRural = function (e) {
          (o.options.exRural = e), r();
        }),
        (o.setExcludePostbox = function (e) {
          (o.options.excludePostBox = e), r();
        }),
        (o.setExcludeUndeliverable = function (e) {
          (o.options.exUndeliver = e), r();
        }),
        (o.setExcludeSpelling = function (e) {
          (o.options.exSpelling = e), r();
        }),
        (o.setExcludeWordRemoval = function (e) {
          (o.options.exWord = e), r();
        }),
        (o.setExcludeIpOrder = function (e) {
          (o.options.exIp = e), r();
        }),
        (o.setExcludePostcodes = function (e) {
          (o.options.exPostcodes = Array.isArray(e) ? e.join("-") : e), r();
        }),
        (o.setIncludePostcodes = function (e) {
          (o.options.inPostcode = Array.isArray(e) ? e.join("-") : e), r();
        }),
        (o.setExcludeRegions = function (e) {
          (o.options.exRegion = Array.isArray(e) ? e.join("-") : e), r();
        }),
        (o.setIncludeRegions = function (e) {
          (o.options.inRegion = Array.isArray(e) ? e.join("-") : e), r();
        }),
        (o.setExcludeTerritories = function (e) {
          (o.options.exTerritory = Array.isArray(e) ? e.join("-") : e), r();
        }),
        (o.setIncludeTerritories = function (e) {
          (o.options.inTerritory = Array.isArray(e) ? e.join("-") : e), r();
        }),
        (o.setTag = function (e) {
          (o.options.tag = e), r();
        }),
        (o.setUniqueId = function (e) {
          (o.options.uniqueId = e), r();
        }),
        (o.getOption = function (e) {
          return o.widget.getOption(e);
        }),
        (o.getMaxResults = function () {
          return o.widget.getOption("max_results");
        }),
        (o.enableLocation = function () {
          o.options.enableLocation = !0;
        }),
        (o.disableLocation = function () {
          o.options.enableLocation = !1;
        }),
        (o.enable = function () {
          o.widget.enable();
        }),
        (o.disable = function () {
          o.widget.disable();
        }),
        (o.setPostcodeMode = function (e) {
          (o.mode = "postcode"),
            o.setOption(
              "empty_content",
              "Postcode not found. Please verify the spelling."
            );
        });
      // NeatComplete.addDomEvent(e, "focus", function (t) {
      //   o.options.enableLocation &&
      //     "" === e.value &&
      //     o.service._response(o.service.last_query, [
      //       { value: o.getOption("location_content"), data: { id: "location" } },
      //     ]);
      // }),
      (o._onLocationResultsEmpty = function (e) {
        var t = o.widget.getOption("empty_content");
        (o.options.enableLocation = !1),
          o.setOption("empty_content", e),
          setTimeout(function () {
            o.setOption("empty_content", t);
          }, 2e3);
      }),
        (o.handleLocationError = function (t) {
          o.makeRequest(
            "errorlog",
            "&message=GeoFailCode:" + t.code + ":" + t.message,
            function (e) {}
          ),
            o._onLocationResultsEmpty(o.getOption("location_unavailable")),
            o.service._response(o.service.last_query, []),
            (e.placeholder = n);
        }),
        (o.reverseGeocode = function (t) {
          o.makeRequest(
            "geocode",
            "&x=" +
              t.coords.longitude +
              "&y=" +
              t.coords.latitude +
              "&limit=" +
              o.getMaxResults(),
            function (t) {
              var i = new Array();
              if (t)
                for (var s = 0; s < t.addresses.length; s++)
                  i.push({
                    value: t.addresses[s].displayname,
                    data: t.addresses[s],
                  });
              0 === i.length &&
                o._onLocationResultsEmpty(o.getOption("location_not_found")),
                (e.placeholder = n),
                o.service._response(o.service.last_query, i);
            }.bind(this)
          );
        }),
        (o.addressSelected = function (e) {}),
        (o.postcodeSelected = function (e) {}),
        (o.assignAddressFields = function (e) {
          if (o.fields.address) {
            o.fields.address.value = e.displayline;
          }
          if (o.fields.suburb) {
            o.fields.suburb.value =
              e.suburb === ""
                ? e.mailtown === ""
                  ? e.city
                  : e.mailtown
                : e.suburb;
          }
          if (o.fields.city) {
            o.fields.city.value = e.mailtown === "" ? e.city : e.mailtown;
            //o.fields.city.dispatchEvent(new Event("input"));
          }
          if (o.fields.territory) {
            o.fields.territory.value = e.territory;
          }
          if (o.fields.x) {
            o.fields.x.value = e.x;
          }
          if (o.fields.y) {
            o.fields.y.value = e.y;
          }
          if (o.fields.dpid) {
            o.fields.dpid.value = e.dpid;
          }
          if (o.fields.id) {
            o.fields.id.value = e.id;
          }
          if (o.fields.postcode) {
            o.fields.postcode.value = e.postcode;
          }
          if (o.fields.line1) {
            o.fields.line1.value = e.address1;
          }
          if (o.fields.line2) {
            o.fields.line2.value = e.address2;
          }
          if (o.fields.line3) {
            o.fields.line3.value = e.address3;
          }
          if (o.fields.line4) {
            o.fields.line4.value = e.address4;
          }
  
          // Additional logic for address and suburb handling
          if (
            !o.fields.city &&
            o.fields.suburb &&
            e.suburb === "" &&
            (e.city !== "" || e.mailtown !== "")
          ) {
            o.fields.suburb.value = e.mailtown === "" ? e.city : e.mailtown;
          }
          if (o.fields.address1 && o.fields.address2) {
            if (e.address4 || e.address2.indexOf("RD ") === 0) {
              o.fields.address1.value = e.address1;
              o.fields.address2.value = e.address2;
            } else {
              o.fields.address1.value = e.displayline;
              o.fields.address2.value = "";
            }
  
            if (!o.fields.suburb && e.suburb && e.suburb !== "") {
              if (o.fields.address2.value !== "") {
                o.fields.address1.value += ", " + o.fields.address2.value;
              }
              o.fields.address2.value = e.suburb;
            }
          } else if (o.fields.address1 && !o.fields.address2) {
            o.fields.address1.value = e.displayline;
          }
        }),
        (o.assignRegion = function (e) {
          var t = o.fields.region;
          if (t)
            if (t.options) {
              e.region = e.region.toUpperCase();
              for (
                var i = [
                    e.region,
                    e.region.replace("'", ""),
                    e.region.replace("-", " - "),
                    e.region.replace("-", " / "),
                    e.region.replace("-", "/"),
                  ],
                  n = 0;
                n < t.options.length;
                n++
              )
                if (
                  i.indexOf(t.options[n].text.toUpperCase()) > -1 ||
                  i.indexOf(t.options[n].value.toUpperCase()) > -1
                ) {
                  t.selectedIndex = n;
                  break;
                }
            } else t.value = e.region;
        }),
        (o.loadAddress = function (e) {
          o.makeRequest(
            "address/" + e,
            "",
            function (e) {
              e &&
                (o.assignAddressFields(e),
                o.assignRegion(e),
                o.addressSelected(e));
            }.bind(this)
          );
        }),
        (o.loadLocation = function () {
          (e.value = ""),
            (e.placeholder = o.getOption("location_loading")),
            navigator.geolocation.getCurrentPosition(
              o.reverseGeocode,
              o.handleLocationError
            );
        }),
        o.widget.on("result:select", function (e, t) {
          "address" === o.mode
            ? "location" === t.id
              ? o.loadLocation()
              : o.loadAddress(t.id)
            : o.postcodeSelected(t);
        }),
        (o.checkDemo = function () {
          return (
            !(!o.key || "demo-api-key" !== o.key.toLowerCase()) &&
            (o.setOption(
              "footer_content",
              '<b>Demo Mode:</b> Create a free account at <a href="https://www.addy.co.nz/" class="link-active">addy.co.nz</a>'
            ),
            !0)
          );
        }),
        o.checkDemo(),
        r(),
        o.makeRequest("searchwarmup", "");
    } else console.warn("Input field is missing");
    function r() {
      (o.searchSuffix = "&max=" + o.getMaxResults()),
        o.options.excludePostBox && (o.searchSuffix += "&expostbox=true"),
        o.options.exUndeliver && (o.searchSuffix += "&exundeliver=true"),
        o.options.exRural && (o.searchSuffix += "&exrural=true"),
        o.options.exSpelling && (o.searchSuffix += "&exspelling=true"),
        o.options.exWord && (o.searchSuffix += "&exword=true"),
        o.options.exIp && (o.searchSuffix += "&exip=true"),
        o.options.exPostcodes &&
          "" !== o.options.exPostcodes &&
          (o.searchSuffix += "&expostcode=" + o.options.exPostcodes),
        o.options.inPostcode &&
          "" !== o.options.inPostcode &&
          (o.searchSuffix += "&inpostcode=" + o.options.inPostcode),
        o.options.exRegion &&
          "" !== o.options.exRegion &&
          (o.searchSuffix += "&exregion=" + o.options.exRegion),
        o.options.inRegion &&
          "" !== o.options.inRegion &&
          (o.searchSuffix += "&inregion=" + o.options.inRegion),
        o.options.exTerritory &&
          "" !== o.options.exTerritory &&
          (o.searchSuffix += "&exterritory=" + o.options.exTerritory),
        o.options.inTerritory &&
          "" !== o.options.inTerritory &&
          (o.searchSuffix += "&interritory=" + o.options.inTerritory),
        (o.requestSuffix = ""),
        o.options.tag &&
          "" !== o.options.tag &&
          (o.requestSuffix += "&tag=" + o.options.tag),
        o.options.uniqueId &&
          "" !== o.options.uniqueId &&
          (o.requestSuffix += "&uniqueid=" + o.options.uniqueId);
    }
  }
  function initAddyByCss() {
    var e = ["", "2-", "3-", "4-"],
      t = "addy-";
    function o(e) {
      var o = document.getElementsByClassName(t + e);
      return 1 === o.length ? o[0] : null;
    }
    for (var i = 0; i < e.length; i++) {
      var n = o(e[i] + "line1");
      if (null !== n)
        new AddyComplete(n, {
          address1: n,
          address2: o(e[i] + "line2"),
          suburb: o(e[i] + "suburb"),
          city: o(e[i] + "city"),
          region: o(e[i] + "region"),
          territory: o(e[i] + "territory"),
          postcode: o(e[i] + "postcode"),
          dpid: o(e[i] + "dpid"),
          id: o(e[i] + "id"),
          x: o(e[i] + "x"),
          y: o(e[i] + "y"),
        });
    }
  }
  function callAddyInit() {
    var e = addySettingsFactory.createCallback(),
      t = !1;
    if (
      (e
        ? (window[e](), (t = !0))
        : "function" == typeof initAddy && (initAddy(), (t = !0)),
      t || initAddyByCss(),
      addySettingsFactory.getLoadCssEnabled())
    ) {
      var o = document.createElement("link");
      o.setAttribute("rel", "stylesheet"),
        o.setAttribute("type", "text/css"),
        o.setAttribute("href", "https://www.addy.co.nz/css/addy.css"),
        document.getElementsByTagName("head")[0].appendChild(o);
    }
  } /*callAddyInit();*/
  
  function getElementByIdVariations(prefix, fieldName) {
    return (
      document.getElementById(prefix + "_" + fieldName) ||
      document.getElementById(prefix + "-" + fieldName)
    );
  }
  
  // WooCommerce Plug-in v2.1.6
  function initAddy() {
    if (!window.addyConfig || !window.addyConfig.key) {
      console.warn("The addyConfig values not found in page.");
      return;
    }
    var widgets = [];
  
    function loadAddyWidget(prefix) {
      // Check if the first element was found; if not, try the alternative selector
      let field = getElementByIdVariations(prefix, "address_1");
  
      // Check if 'field' is valid before proceeding
      if (!field) {
          // todo remove 
        console.warn("Address text fields cannot wasn't found in page.");
        return;
      }
  
      var addyComplete = new AddyComplete(field);
      addyComplete.fields = {
        address1: field,
        address2: getElementByIdVariations(prefix, "address_2"),
        suburb: getElementByIdVariations(prefix, "suburb"),
        city: getElementByIdVariations(prefix, "city"),
        postcode: getElementByIdVariations(prefix, "postcode"),
      };
  
      function dispatchEventFieldValueChanged(instance) {
        if (!instance) return;
  
        let eventInput, eventChange;
        if (typeof Event === "function") {
          eventChange = new Event("change", { bubbles: true });
          eventInput = new Event("input", { bubbles: true });
        } else {
          eventChange = document.createEvent("Event");
          eventInput = document.createEvent("Event");
          eventChange.initEvent("change", true, true);
          eventInput.initEvent("input", true, true);
        }
  
        instance.dispatchEvent(eventInput);
        instance.dispatchEvent(eventChange);
      }
  
      widgets[prefix] = addyComplete;
      addyComplete.key = window.addyConfig.key;
      var config = window.addyConfig;
  
      addyComplete.setExcludePostbox(
        config.hidePostCode && config.hidePostCode === "yes"
      );
      addyComplete.setExcludeRural(
        config.hideRural && config.hideRural === "yes"
      );
      addyComplete.setExcludeUndeliverable(
        config.hideUndeliver && config.hideUndeliver === "yes"
      );
  
      if (config.enableLocation && config.enableLocation === "yes") {
        addyComplete.enableLocation();
      }
      if (config.filterPostcodes && config.filterPostcodes !== "") {
        addyComplete.setIncludePostcodes(config.filterPostcodes);
      }
      if (config.filterRegions && config.filterRegions !== "") {
        addyComplete.setIncludeRegions(config.filterRegions);
      }
      if (config.notFound && config.notFound !== "") {
        addyComplete.setOption("empty_content", config.notFound);
      }
  
      addyComplete.widget._getPosition = function () {
        const rect = field.getBoundingClientRect(); // Get element position relative to viewport
        const position = {
          top: rect.top + window.scrollY, // Add scroll offset for the top
          left: rect.left + window.scrollX, // Add scroll offset for the left
        };
  
        // Add the element's height to the top position (similar to jQuery's outerHeight)
        position.top += field.offsetHeight;
  
        return position;
      };
  
      addyComplete.checkDemo();
      addyComplete.customRegion = getElementByIdVariations(prefix, "state");
  
    // Helper: Read field value using underscore then dash selectors.
  function getFieldValue(selectorUnderscore, selectorDash) {
    if (jQuery(selectorUnderscore).length > 0) {
      return jQuery(selectorUnderscore).val();
    } else if (jQuery(selectorDash).length > 0) {
      return jQuery(selectorDash).val();
    }
    return "";
  }
  
  // Helper: Set the field value in both underscore and dash selectors.
  function setFieldValue(selectorUnderscore, selectorDash, value) {
    if (jQuery(selectorUnderscore).length > 0) {
      jQuery(selectorUnderscore).val(value);
    }
    if (jQuery(selectorDash).length > 0) {
      jQuery(selectorDash).val(value);
    }
  }
  
  // Helper: Trigger native events on a field using either selector.
  function triggerForField(selectorUnderscore, selectorDash) {
    let el = document.querySelector(selectorUnderscore) || document.querySelector(selectorDash);
    if (el) {
      var evt;
      if (typeof Event === "function") {
        evt = new Event("input", { bubbles: true });
        el.dispatchEvent(evt);
        evt = new Event("change", { bubbles: true });
        el.dispatchEvent(evt);
      } else {
        evt = document.createEvent("Event");
        evt.initEvent("input", true, true);
        el.dispatchEvent(evt);
        evt = document.createEvent("Event");
        evt.initEvent("change", true, true);
        el.dispatchEvent(evt);
      }
    }
  }
  
  addyComplete.addressSelected = function(address) {
    // --- 1. Update the custom region field if available ---
    if (this.customRegion && this.customRegion.options && address.region !== "") {
      var selectedCode = "";
      for (let i = 0; i < this.customRegion.options.length; i++) {
        const option = this.customRegion.options[i];
        if (
          option.text === address.region ||
          option.value === address.region
        ) {
          selectedCode = option.value;
          break;
        }
      }
      if (selectedCode !== "") {
        this.customRegion.value = selectedCode;
      }
    }
  
    // --- 2. Build updated billing and shipping objects using Addy data or current values ---
    var newBilling = {
      first_name: address.first_name || getFieldValue("#billing_first_name", "#billing-first_name"),
      last_name:  address.last_name  || getFieldValue("#billing_last_name", "#billing-last_name"),
      company:    address.company    || getFieldValue("#billing_company", "#billing-company"),
      address_1:  address.displayline || getFieldValue("#billing_address_1", "#billing-address_1"),
      address_2:  address.address2   || getFieldValue("#billing_address_2", "#billing-address_2"),
      city:       address.city       || getFieldValue("#billing_city", "#billing-city"),
      state:      address.state      || getFieldValue("#billing_state", "#billing-state"),
      postcode:   address.postcode   || getFieldValue("#billing_postcode", "#billing-postcode"),
      country:    address.country    || getFieldValue("#billing_country", "#billing-country") || "NZ",
      email:      address.email      || getFieldValue("#billing_email", "#billing-email"),
      phone:      address.phone      || getFieldValue("#billing_phone", "#billing-phone")
    };
  
    var newShipping = {
      first_name: address.first_name || getFieldValue("#shipping_first_name", "#shipping-first_name"),
      last_name:  address.last_name  || getFieldValue("#shipping_last_name", "#shipping-last_name"),
      company:    address.company    || getFieldValue("#shipping_company", "#shipping-company"),
      address_1:  address.displayline || getFieldValue("#shipping_address_1", "#shipping-address_1"),
      address_2:  address.address2   || getFieldValue("#shipping_address_2", "#shipping-address_2"),
      city:       address.city       || getFieldValue("#shipping_city", "#shipping-city"),
      state:      address.state      || getFieldValue("#shipping_state", "#shipping-state"),
      postcode:   address.postcode   || getFieldValue("#shipping_postcode", "#shipping-postcode"),
      country:    address.country    || getFieldValue("#shipping_country", "#shipping-country") || "NZ",
      phone:      address.phone      || getFieldValue("#shipping_phone", "#shipping-phone")
    };
  
    // --- 3. Assign new values to visible checkout fields ---
    setFieldValue("#billing_address_1", "#billing-address_1", newBilling.address_1);
    setFieldValue("#billing_address_2", "#billing-address_2", newBilling.address_2);
    setFieldValue("#billing_city", "#billing-city", newBilling.city);
    setFieldValue("#billing_postcode", "#billing-postcode", newBilling.postcode);
    // For the custom region, update if available.
    if (this.customRegion) {
      this.customRegion.value = newBilling.state;
    }
  
    // --- 4. Log form data (optional) ---
    let form = jQuery(addyComplete.fields.address1).closest("form");
    // console.log("Form data after assignment:", form.serialize());
  
    // --- 5. Trigger native events on the updated fields ---
    triggerForField("#billing_address_1", "#billing-address_1");
    triggerForField("#billing_address_2", "#billing-address_2");
    triggerForField("#billing_city", "#billing-city");
    triggerForField("#billing_postcode", "#billing-postcode");
    if (this.customRegion) {
      // Trigger events on the custom region element (only one selector assumed here)
      if (this.customRegion.dispatchEvent) {
        let evt = (typeof Event === "function")
          ? new Event("input", { bubbles: true })
          : document.createEvent("Event");
        if (!(evt instanceof Event)) {
          evt.initEvent("input", true, true);
        }
        this.customRegion.dispatchEvent(evt);
        evt = (typeof Event === "function")
          ? new Event("change", { bubbles: true })
          : document.createEvent("Event");
        if (!(evt instanceof Event)) {
          evt.initEvent("change", true, true);
        }
        this.customRegion.dispatchEvent(evt);
      }
    }
  
    // --- 6. Build the payload for updating customer data ---
    var payload = {
      billing_address: newBilling,
      shipping_address: newShipping
    };
  
    // console.log("Payload for update-customer:", payload);
  
    // --- 7. Call the update-customer endpoint using wp.apiFetch ---
    wp.apiFetch({
      path: '/wc/store/v1/cart/update-customer',
      method: 'POST',
      data: payload,
      headers: {
        'X-WP-Nonce': (window.wpApiSettings && window.wpApiSettings.nonce) || ""
      }
    })
    .then(function(response) {
      // console.log("update-customer response:", response);
      // If the response doesn't include our updated values, merge them in.
      if (!response.billing_address.first_name) {
        response.billing_address = newBilling;
      }
      if (!response.shipping_address.first_name) {
        response.shipping_address = newShipping;
      }
      // Update the WooCommerce Blocks cart store (if available)
      if (
        wp.data &&
        wp.data.dispatch &&
        typeof wp.data.dispatch('wc/store/cart').receiveCart === 'function'
      ) {
        wp.data.dispatch('wc/store/cart').receiveCart(response);
      }
      // Trigger an update event so that any additional scripts refresh their state.
      jQuery(document.body).trigger("update_checkout");
    })
    .catch(function(error) {
      console.error("Error updating customer data:", error);
    });
  };
  
      var country = getElementByIdVariations(prefix, "country");
  
      // Check if the country element is found, then add a change event listener
      if (country) {
        country.addEventListener("change", countryChanged.bind(this));
      }
  
      function countryChanged() {
        // Check the value of the country dropdown
        if (getElementByIdVariations(prefix, "country").value === "NZ") {
          widgets[prefix].widget.enable();
        } else {
          widgets[prefix].widget.disable();
        }
      }
    }
  
    loadAddyWidget("billing");
    loadAddyWidget("shipping"); // shipping-address_1
  }
  
  // Function to update the label for a specific input
  function updateLabel(inputElement) {
    if (inputElement) {
      const labelElement = document.querySelector(
        `label[for="${inputElement.id}"]`
      );
      if (labelElement) {
        labelElement.textContent = inputElement.value || labelElement.textContent; // Default text if empty
      }
    }
  }
  
  function initAddyDomLoad(retries) {
    if (retries === 0) {
      console.warn(
        "It seems like Addy plugin initialziation process did not finished successfully because run out of the tries cycles. Plugin is going to initialize anyway but the plugin logic may not work."
      );
      initAddy();
      return;
    }
  
    // Check if we are on the checkout page and key WooCommerce elements are present
    if (
      getElementByIdVariations("billing", "address_1") ||
      getElementByIdVariations("shipping", "address_1")
    ) {
      // TODO set autocomplete to off
  
      // List of WooCommerce checkout fields with underscore format
      const fieldIds = [
        "address_1",
        "address_2",
        "city",
        "postcode",
        "shipping-state",
        "country",
      ];
      const addTypes = ["billing", "shipping"];
  
      addTypes.forEach(function (type) {
        fieldIds.forEach(function (id) {
          // Try to find the element with an underscore
          let elTmp = getElementByIdVariations(type, id);
  
          // If the field is found, set autocomplete attribute to off
          if (elTmp) {
            elTmp.setAttribute("autocomplete", "off");
  
            // Update label whenever the input value changes
            elTmp.addEventListener("change", () => {
              const divContainers = elTmp.closest("div");
              if (
                divContainers &&
                elTmp.value &&
                !divContainers.classList.contains("is-active")
              ) {
                divContainers.classList.add("is-active"); // Adjust based on your specific style needs
                // console.log(divContainers.style.cssText);
              }
            });
          }
        });
      });
  
  
      jQuery(document.body).on('updated_checkout', function () {
          // Reapply values from local storage
          //console.log('updated_checkout called');
  
          //document.getElementById('shipping-line1').value = localStorage.getItem('shipping_line1');
      });
  
      initAddy(); // Initialize if elements are detected
      console.info("Addy plugin initialized successfuly.");
      return;
    } else {
      setTimeout(function () {
        initAddyDomLoad(retries - 1); // Retry after 1 second
      }, 1000);
    }
  }
  
  (function () {
    jQuery(document).ready(function () {
      initAddyDomLoad(6);
    });
  })();
  
  document.addEventListener("DOMContentLoaded", function () {});