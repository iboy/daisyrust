/* http://prismjs.com/download.html?themes=prism&languages=markup+css+css-extras+clike+javascript+java+php+php-extras+bash+c+cpp+python+sql+ruby+go */
var self = typeof window != "undefined" ? window : {},
    Prism = function() {
        var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i,
            t = self.Prism = {
                util: {
                    type: function(e) {
                        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
                    },
                    clone: function(e) {
                        var n = t.util.type(e);
                        switch (n) {
                        case "Object":
                            var r = {};
                            for (var i in e)
                                e.hasOwnProperty(i) && (r[i] = t.util.clone(e[i]));
                            return r;
                        case "Array":
                            return e.slice()
                        }
                        return e
                    }
                },
                languages: {
                    extend: function(e, n) {
                        var r = t.util.clone(t.languages[e]);
                        for (var i in n)
                            r[i] = n[i];
                        return r
                    },
                    insertBefore: function(e, n, r, i) {
                        i = i || t.languages;
                        var s = i[e],
                            o = {};
                        for (var u in s)
                            if (s.hasOwnProperty(u)) {
                                if (u == n)
                                    for (var a in r)
                                        r.hasOwnProperty(a) && (o[a] = r[a]);
                                o[u] = s[u]
                            }
                        return i[e] = o
                    },
                    DFS: function(e, n) {
                        for (var r in e) {
                            n.call(e, r, e[r]);
                            t.util.type(e) === "Object" && t.languages.DFS(e[r], n)
                        }
                    }
                },
                highlightAll: function(e, n) {
                    var r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');
                    for (var i = 0, s; s = r[i++];)
                        t.highlightElement(s, e === !0, n)
                },
                highlightElement: function(r, i, s) {
                    var o,
                        u,
                        a = r;
                    while (a && !e.test(a.className))
                        a = a.parentNode;
                    if (a) {
                        o = (a.className.match(e) || [, ""])[1];
                        u = t.languages[o]
                    }
                    if (!u)
                        return;
                    r.className = r.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o;
                    a = r.parentNode;
                    /pre/i.test(a.nodeName) && (a.className = a.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o);
                    var f = r.textContent;
                    if (!f)
                        return;
                    f = f.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
                    var l = {
                        element: r,
                        language: o,
                        grammar: u,
                        code: f
                    };
                    t.hooks.run("before-highlight", l);
                    if (i && self.Worker) {
                        var c = new Worker(t.filename);
                        c.onmessage = function(e) {
                            l.highlightedCode = n.stringify(JSON.parse(e.data), o);
                            t.hooks.run("before-insert", l);
                            l.element.innerHTML = l.highlightedCode;
                            s && s.call(l.element);
                            t.hooks.run("after-highlight", l)
                        };
                        c.postMessage(JSON.stringify({
                            language: l.language,
                            code: l.code
                        }))
                    } else {
                        l.highlightedCode = t.highlight(l.code, l.grammar, l.language);
                        t.hooks.run("before-insert", l);
                        l.element.innerHTML = l.highlightedCode;
                        s && s.call(r);
                        t.hooks.run("after-highlight", l)
                    }
                },
                highlight: function(e, r, i) {
                    return n.stringify(t.tokenize(e, r), i)
                },
                tokenize: function(e, n, r) {
                    var i = t.Token,
                        s = [e],
                        o = n.rest;
                    if (o) {
                        for (var u in o)
                            n[u] = o[u];
                        delete n.rest
                    }
                    e:
                    for (var u in n) {
                        if (!n.hasOwnProperty(u) || !n[u])
                            continue;
                        var a = n[u],
                            f = a.inside,
                            l = !!a.lookbehind,
                            c = 0;
                        a = a.pattern || a;
                        for (var h = 0; h < s.length; h++) {
                            var p = s[h];
                            if (s.length > e.length)
                                break e;
                            if (p instanceof i)
                                continue;
                            a.lastIndex = 0;
                            var d = a.exec(p);
                            if (d) {
                                l && (c = d[1].length);
                                var v = d.index - 1 + c,
                                    d = d[0].slice(c),
                                    m = d.length,
                                    g = v + m,
                                    y = p.slice(0, v + 1),
                                    b = p.slice(g + 1),
                                    w = [h, 1];
                                y && w.push(y);
                                var E = new i(u, f ? t.tokenize(d, f) : d);
                                w.push(E);
                                b && w.push(b);
                                Array.prototype.splice.apply(s, w)
                            }
                        }
                    }
                    return s
                },
                hooks: {
                    all: {},
                    add: function(e, n) {
                        var r = t.hooks.all;
                        r[e] = r[e] || [];
                        r[e].push(n)
                    },
                    run: function(e, n) {
                        var r = t.hooks.all[e];
                        if (!r || !r.length)
                            return;
                        for (var i = 0, s; s = r[i++];)
                            s(n)
                    }
                }
            },
            n = t.Token = function(e, t) {
                this.type = e;
                this.content = t
            };
        n.stringify = function(e, r, i) {
            if (typeof e == "string")
                return e;
            if (Object.prototype.toString.call(e) == "[object Array]")
                return e.map(function(t) {
                    return n.stringify(t, r, e)
                }).join("");
            var s = {
                type: e.type,
                content: n.stringify(e.content, r, i),
                tag: "span",
                classes: ["token", e.type],
                attributes: {},
                language: r,
                parent: i
            };
            s.type == "comment" && (s.attributes.spellcheck = "true");
            t.hooks.run("wrap", s);
            var o = "";
            for (var u in s.attributes)
                o += u + '="' + (s.attributes[u] || "") + '"';
            return "<" + s.tag + ' class="' + s.classes.join(" ") + '" ' + o + ">" + s.content + "</" + s.tag + ">"
        };
        if (!self.document) {
            if (!self.addEventListener)
                return self.Prism;
            self.addEventListener("message", function(e) {
                var n = JSON.parse(e.data),
                    r = n.language,
                    i = n.code;
                self.postMessage(JSON.stringify(t.tokenize(i, t.languages[r])));
                self.close()
            }, !1);
            return self.Prism
        }
        var r = document.getElementsByTagName("script");
        r = r[r.length - 1];
        if (r) {
            t.filename = r.src;
            document.addEventListener && !r.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll)
        }
        return self.Prism
    }();
typeof module != "undefined" && module.exports && (module.exports = Prism);
;
Prism.languages.markup = {
    comment: /&lt;!--[\w\W]*?-->/g,
    prolog: /&lt;\?.+?\?>/,
    doctype: /&lt;!DOCTYPE.+?>/,
    cdata: /&lt;!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
        pattern: /&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
        inside: {
            tag: {
                pattern: /^&lt;\/?[\w:-]+/i,
                inside: {
                    punctuation: /^&lt;\/?/,
                    namespace: /^[\w-]+?:/
                }
            },
            "attr-value": {
                pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
                inside: {
                    punctuation: /=|>|"/g
                }
            },
            punctuation: /\/?>/g,
            "attr-name": {
                pattern: /[\w:-]+/g,
                inside: {
                    namespace: /^[\w-]+?:/
                }
            }
        }
    },
    entity: /&amp;#?[\da-z]{1,8};/gi
};
Prism.hooks.add("wrap", function(e) {
    e.type === "entity" && (e.attributes.title = e.content.replace(/&amp;/, "&"))
});
;
Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//g,
    atrule: {
        pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
        inside: {
            punctuation: /[;:]/g
        }
    },
    url: /url\((["']?).*?\1\)/gi,
    selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
    property: /(\b|\B)[\w-]+(?=\s*:)/ig,
    string: /("|')(\\?.)*?\1/g,
    important: /\B!important\b/gi,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[\{\};:]/g
};
Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/ig,
        inside: {
            tag: {
                pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/ig,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.css
        }
    }
});
;
Prism.languages.css.selector = {
    pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/g,
    inside: {
        "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/g,
        "pseudo-class": /:[-\w]+(?:\(.*\))?/g,
        "class": /\.[-:\.\w]+/g,
        id: /#[-:\.\w]+/g
    }
};
Prism.languages.insertBefore("css", "ignore", {
    hexcode: /#[\da-f]{3,6}/gi,
    entity: /\\[\da-f]{1,8}/gi,
    number: /[\d%\.]+/g,
    "function": /(attr|calc|cross-fade|cycle|element|hsla?|image|lang|linear-gradient|matrix3d|matrix|perspective|radial-gradient|repeating-linear-gradient|repeating-radial-gradient|rgba?|rotatex|rotatey|rotatez|rotate3d|rotate|scalex|scaley|scalez|scale3d|scale|skewx|skewy|skew|steps|translatex|translatey|translatez|translate3d|translate|url|var)/ig
});
;
Prism.languages.clike = {
    comment: {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,
        lookbehind: !0
    },
    string: /("|')(\\?.)*?\1/g,
    "class-name": {
        pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/ig,
        lookbehind: !0,
        inside: {
            punctuation: /(\.|\\)/
        }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
    "boolean": /\b(true|false)\b/g,
    "function": {
        pattern: /[a-z0-9_]+\(/ig,
        inside: {
            punctuation: /\(/
        }
    },
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
    operator: /[-+]{1,2}|!|&lt;=?|>=?|={1,3}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[{}[\];(),.:]/g
};
;
Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(var|let|if|else|while|do|for|return|in|instanceof|function|get|set|new|with|typeof|try|throw|catch|finally|null|break|continue|this)\b/g,
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g
});
Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
        lookbehind: !0
    }
});
Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/ig,
        inside: {
            tag: {
                pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/ig,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.javascript
        }
    }
});
;
Prism.languages.java = Prism.languages.extend("clike", {
    keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/g,
    number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+[e]?[\d]*[df]\b|\W\d*\.?\d+\b/gi,
    operator: {
        pattern: /([^\.]|^)([-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|%|\^|(&lt;){2}|($gt;){2,3}|:|~)/g,
        lookbehind: !0
    }
});
;
/**
 * Original by Aaron Harun: http://aahacreative.com/2012/07/31/php-syntax-highlighting-prism/
 * Modified by Miles Johnson: http://milesj.me
 *
 * Supports the following:
 * 		- Extends clike syntax
 * 		- Support for PHP 5.3 and 5.4 (namespaces, traits, etc)
 * 		- Smarter constant and function matching
 *
 * Adds the following new token classes:
 * 		constant, delimiter, variable, function, package
 */
Prism.languages.php = Prism.languages.extend("clike", {
    keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/ig,
    constant: /\b[A-Z0-9_]{2,}\b/g
});
Prism.languages.insertBefore("php", "keyword", {
    delimiter: /(\?>|&lt;\?php|&lt;\?)/ig,
    variable: /(\$\w+)\b/ig,
    "package": {
        pattern: /(\\|namespace\s+|use\s+)[\w\\]+/g,
        lookbehind: !0,
        inside: {
            punctuation: /\\/
        }
    }
});
Prism.languages.insertBefore("php", "operator", {
    property: {
        pattern: /(->)[\w]+/g,
        lookbehind: !0
    }
});
if (Prism.languages.markup) {
    Prism.hooks.add("before-highlight", function(e) {
        if (e.language !== "php")
            return;
        e.tokenStack = [];
        e.code = e.code.replace(/(?:&lt;\?php|&lt;\?|<\?php|<\?)[\w\W]*?(?:\?&gt;|\?>)/ig, function(t) {
            e.tokenStack.push(t);
            return "{{{PHP" + e.tokenStack.length + "}}}"
        })
    });
    Prism.hooks.add("after-highlight", function(e) {
        if (e.language !== "php")
            return;
        for (var t = 0, n; n = e.tokenStack[t]; t++)
            e.highlightedCode = e.highlightedCode.replace("{{{PHP" + (t + 1) + "}}}", Prism.highlight(n, e.grammar, "php"));
        e.element.innerHTML = e.highlightedCode
    });
    Prism.hooks.add("wrap", function(e) {
        e.language === "php" && e.type === "markup" && (e.content = e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'))
    });
    Prism.languages.insertBefore("php", "comment", {
        markup: {
            pattern: /(&lt;|<)[^?]\/?(.*?)(>|&gt;)/g,
            inside: Prism.languages.markup
        },
        php: /\{\{\{PHP[0-9]+\}\}\}/g
    })
}
;
;
Prism.languages.insertBefore("php", "variable", {
    "this": /\$this/g,
    global: /\$_?(GLOBALS|SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/g,
    scope: {
        pattern: /\b[\w\\]+::/g,
        inside: {
            keyword: /(static|self|parent)/,
            punctuation: /(::|\\)/
        }
    }
});
;
Prism.languages.bash = Prism.languages.extend("clike", {
    comment: {
        pattern: /(^|[^"{\\])(#.*?(\r?\n|$))/g,
        lookbehind: !0
    },
    string: {
        pattern: /("|')(\\?[\s\S])*?\1/g,
        inside: {
            property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/g
        }
    },
    keyword: /\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/g
});
Prism.languages.insertBefore("bash", "keyword", {
    property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/g
});
Prism.languages.insertBefore("bash", "comment", {
    important: /(^#!\s*\/bin\/bash)|(^#!\s*\/bin\/sh)/g
});
;
Prism.languages.c = Prism.languages.extend("clike", {
    keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/g,
    operator: /[-+]{1,2}|!=?|&lt;{1,2}=?|&gt;{1,2}=?|\-&gt;|={1,2}|\^|~|%|(&amp;){1,2}|\|?\||\?|\*|\//g
});
Prism.languages.insertBefore("c", "keyword", {
    property: {
        pattern: /#[a-zA-Z]+\ .*/g,
        inside: {
            property: /&lt;[a-zA-Z.]+>/g
        }
    }
});
;
Prism.languages.cpp = Prism.languages.extend("c", {
    keyword: /\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|delete\[\]|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|new\[\]|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/g,
    operator: /[-+]{1,2}|!=?|&lt;{1,2}=?|&gt;{1,2}=?|\-&gt;|:{1,2}|={1,2}|\^|~|%|(&amp;){1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/g
});
;
Prism.languages.python = {
    comment: {
        pattern: /(^|[^\\])#.*?(\r?\n|$)/g,
        lookbehind: !0
    },
    string: /("|')(\\?.)*?\1/g,
    keyword: /\b(as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/g,
    "boolean": /\b(True|False)\b/g,
    number: /\b-?(0x)?\d*\.?[\da-f]+\b/g,
    operator: /[-+]{1,2}|=?&lt;|=?&gt;|!|={1,2}|(&){1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/g,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[{}[\];(),.:]/g
};
;
Prism.languages.sql = {
    comment: {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|((--)|(\/\/)|#).*?(\r?\n|$))/g,
        lookbehind: !0
    },
    string: /("|')(\\?.)*?\1/g,
    keyword: /\b(ACTION|ADD|AFTER|ALGORITHM|ALTER|ANALYZE|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADE|CASCADED|CASE|CHAIN|CHAR VARYING|CHARACTER VARYING|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATA|DATABASE|DATABASES|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DOUBLE PRECISION|DROP|DUMMY|DUMP|DUMPFILE|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE|ESCAPED BY|EXCEPT|EXEC|EXECUTE|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR|FOR EACH ROW|FORCE|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GEOMETRY|GEOMETRYCOLLECTION|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY|IDENTITY_INSERT|IDENTITYCOL|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEY|KEYS|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONGBLOB|LONGTEXT|MATCH|MATCHED|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTILINESTRING|MULTIPOINT|MULTIPOLYGON|NATIONAL|NATIONAL CHAR VARYING|NATIONAL CHARACTER|NATIONAL CHARACTER VARYING|NATIONAL VARCHAR|NATURAL|NCHAR|NCHAR VARCHAR|NEXT|NO|NO SQL|NOCHECK|NOCYCLE|NONCLUSTERED|NULLIF|NUMERIC|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUT|OUTER|OUTFILE|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC|PROCEDURE|PUBLIC|PURGE|QUICK|RAISERROR|READ|READS SQL DATA|READTEXT|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROWCOUNT|ROWGUIDCOL|ROWS?|RTREE|RULE|SAVE|SAVEPOINT|SCHEMA|SELECT|SERIAL|SERIALIZABLE|SESSION|SESSION_USER|SET|SETUSER|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START|STARTING BY|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLE|TABLES|TABLESPACE|TEMPORARY|TEMPTABLE|TERMINATED BY|TEXT|TEXTSIZE|THEN|TIMESTAMP|TINYBLOB|TINYINT|TINYTEXT|TO|TOP|TRAN|TRANSACTION|TRANSACTIONS|TRIGGER|TRUNCATE|TSEQUAL|TYPE|TYPES|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH|WITH ROLLUP|WITHIN|WORK|WRITE|WRITETEXT)\b/gi,
    "boolean": /\b(TRUE|FALSE|NULL)\b/gi,
    number: /\b-?(0x)?\d*\.?[\da-f]+\b/g,
    operator: /\b(ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|IS|UNIQUE|CHARACTER SET|COLLATE|DIV|OFFSET|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b|[-+]{1}|!|=?&lt;|=?&gt;|={1}|(&amp;){1,2}|\|?\||\?|\*|\//gi,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[;[\]()`,.]/g
};
;
/**
 * Original by Samuel Flores
 *
 * Adds the following new token classes:
 * 		constant, builtin, variable, symbol, regex
 */
Prism.languages.ruby = Prism.languages.extend("clike", {
    comment: /#[^\r\n]*(\r?\n|$)/g,
    keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,
    builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
    constant: /\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g
});
Prism.languages.insertBefore("ruby", "keyword", {
    regex: {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
        lookbehind: !0
    },
    variable: /[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,
    symbol: /:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g
});
;
Prism.languages.go = Prism.languages.extend("clike", {
    keyword: /\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g,
    builtin: /\b(bool|byte|complex(64|128)|error|float(32|64)|rune|string|u?int(8|16|32|64|)|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(ln)?|real|recover)\b/g,
    "boolean": /\b(_|iota|nil|true|false)\b/g,
    operator: /([(){}\[\]]|[*\/%^!]=?|\+[=+]?|-[>=-]?|\|[=|]?|>[=>]?|&lt;(&lt;|[=-])?|==?|&amp;(&amp;|=|^=?)?|\.(\.\.)?|[,;]|:=?)/g,
    number: /\b(-?(0x[a-f\d]+|(\d+\.?\d*|\.\d+)(e[-+]?\d+)?)i?)\b/ig,
    string: /("|'|`)(\\?.|\r|\n)*?\1/g
});
delete Prism.languages.go["class-name"];
;

