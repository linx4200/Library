/*! library - v0.0.1 - 2014-04-24 */
/*! Sea.js 2.2.1 | seajs.org/LICENSE.md */
!function(a,b){function c(a){return function(b){return{}.toString.call(b)=="[object "+a+"]"}}function d(){return A++}function e(a){return a.match(D)[0]}function f(a){for(a=a.replace(E,"/");a.match(F);)a=a.replace(F,"/");return a=a.replace(G,"$1/")}function g(a){var b=a.length-1,c=a.charAt(b);return"#"===c?a.substring(0,b):".js"===a.substring(b-2)||a.indexOf("?")>0||".css"===a.substring(b-3)||"/"===c?a:a+".js"}function h(a){var b=v.alias;return b&&x(b[a])?b[a]:a}function i(a){var b=v.paths,c;return b&&(c=a.match(H))&&x(b[c[1]])&&(a=b[c[1]]+c[2]),a}function j(a){var b=v.vars;return b&&a.indexOf("{")>-1&&(a=a.replace(I,function(a,c){return x(b[c])?b[c]:a})),a}function k(a){var b=v.map,c=a;if(b)for(var d=0,e=b.length;e>d;d++){var f=b[d];if(c=z(f)?f(a)||a:a.replace(f[0],f[1]),c!==a)break}return c}function l(a,b){var c,d=a.charAt(0);if(J.test(a))c=a;else if("."===d)c=f((b?e(b):v.cwd)+a);else if("/"===d){var g=v.cwd.match(K);c=g?g[0]+a.substring(1):a}else c=v.base+a;return 0===c.indexOf("//")&&(c=location.protocol+c),c}function m(a,b){if(!a)return"";a=h(a),a=i(a),a=j(a),a=g(a);var c=l(a,b);return c=k(c)}function n(a){return a.hasAttribute?a.src:a.getAttribute("src",4)}function o(a,b,c){var d=S.test(a),e=L.createElement(d?"link":"script");if(c){var f=z(c)?c(a):c;f&&(e.charset=f)}p(e,b,d,a),d?(e.rel="stylesheet",e.href=a):(e.async=!0,e.src=a),T=e,R?Q.insertBefore(e,R):Q.appendChild(e),T=null}function p(a,c,d,e){function f(){a.onload=a.onerror=a.onreadystatechange=null,d||v.debug||Q.removeChild(a),a=null,c()}var g="onload"in a;return!d||!V&&g?(g?(a.onload=f,a.onerror=function(){C("error",{uri:e,node:a}),f()}):a.onreadystatechange=function(){/loaded|complete/.test(a.readyState)&&f()},b):(setTimeout(function(){q(a,c)},1),b)}function q(a,b){var c=a.sheet,d;if(V)c&&(d=!0);else if(c)try{c.cssRules&&(d=!0)}catch(e){"NS_ERROR_DOM_SECURITY_ERR"===e.name&&(d=!0)}setTimeout(function(){d?b():q(a,b)},20)}function r(){if(T)return T;if(U&&"interactive"===U.readyState)return U;for(var a=Q.getElementsByTagName("script"),b=a.length-1;b>=0;b--){var c=a[b];if("interactive"===c.readyState)return U=c}}function s(a){var b=[];return a.replace(X,"").replace(W,function(a,c,d){d&&b.push(d)}),b}function t(a,b){this.uri=a,this.dependencies=b||[],this.exports=null,this.status=0,this._waitings={},this._remain=0}if(!a.seajs){var u=a.seajs={version:"2.2.1"},v=u.data={},w=c("Object"),x=c("String"),y=Array.isArray||c("Array"),z=c("Function"),A=0,B=v.events={};u.on=function(a,b){var c=B[a]||(B[a]=[]);return c.push(b),u},u.off=function(a,b){if(!a&&!b)return B=v.events={},u;var c=B[a];if(c)if(b)for(var d=c.length-1;d>=0;d--)c[d]===b&&c.splice(d,1);else delete B[a];return u};var C=u.emit=function(a,b){var c=B[a],d;if(c)for(c=c.slice();d=c.shift();)d(b);return u},D=/[^?#]*\//,E=/\/\.\//g,F=/\/[^/]+\/\.\.\//,G=/([^:/])\/\//g,H=/^([^/:]+)(\/.+)$/,I=/{([^{]+)}/g,J=/^\/\/.|:\//,K=/^.*?\/\/.*?\//,L=document,M=e(L.URL),N=L.scripts,O=L.getElementById("seajsnode")||N[N.length-1],P=e(n(O)||M);u.resolve=m;var Q=L.head||L.getElementsByTagName("head")[0]||L.documentElement,R=Q.getElementsByTagName("base")[0],S=/\.css(?:\?|$)/i,T,U,V=+navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/(\d+).*/,"$1")<536;u.request=o;var W=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,X=/\\\\/g,Y=u.cache={},Z,$={},_={},ab={},bb=t.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};t.prototype.resolve=function(){for(var a=this,b=a.dependencies,c=[],d=0,e=b.length;e>d;d++)c[d]=t.resolve(b[d],a.uri);return c},t.prototype.load=function(){var a=this;if(!(a.status>=bb.LOADING)){a.status=bb.LOADING;var c=a.resolve();C("load",c);for(var d=a._remain=c.length,e,f=0;d>f;f++)e=t.get(c[f]),e.status<bb.LOADED?e._waitings[a.uri]=(e._waitings[a.uri]||0)+1:a._remain--;if(0===a._remain)return a.onload(),b;var g={};for(f=0;d>f;f++)e=Y[c[f]],e.status<bb.FETCHING?e.fetch(g):e.status===bb.SAVED&&e.load();for(var h in g)g.hasOwnProperty(h)&&g[h]()}},t.prototype.onload=function(){var a=this;a.status=bb.LOADED,a.callback&&a.callback();var b=a._waitings,c,d;for(c in b)b.hasOwnProperty(c)&&(d=Y[c],d._remain-=b[c],0===d._remain&&d.onload());delete a._waitings,delete a._remain},t.prototype.fetch=function(a){function c(){u.request(g.requestUri,g.onRequest,g.charset)}function d(){delete $[h],_[h]=!0,Z&&(t.save(f,Z),Z=null);var a,b=ab[h];for(delete ab[h];a=b.shift();)a.load()}var e=this,f=e.uri;e.status=bb.FETCHING;var g={uri:f};C("fetch",g);var h=g.requestUri||f;return!h||_[h]?(e.load(),b):$[h]?(ab[h].push(e),b):($[h]=!0,ab[h]=[e],C("request",g={uri:f,requestUri:h,onRequest:d,charset:v.charset}),g.requested||(a?a[g.requestUri]=c:c()),b)},t.prototype.exec=function(){function a(b){return t.get(a.resolve(b)).exec()}var c=this;if(c.status>=bb.EXECUTING)return c.exports;c.status=bb.EXECUTING;var e=c.uri;a.resolve=function(a){return t.resolve(a,e)},a.async=function(b,c){return t.use(b,c,e+"_async_"+d()),a};var f=c.factory,g=z(f)?f(a,c.exports={},c):f;return g===b&&(g=c.exports),delete c.factory,c.exports=g,c.status=bb.EXECUTED,C("exec",c),g},t.resolve=function(a,b){var c={id:a,refUri:b};return C("resolve",c),c.uri||u.resolve(c.id,b)},t.define=function(a,c,d){var e=arguments.length;1===e?(d=a,a=b):2===e&&(d=c,y(a)?(c=a,a=b):c=b),!y(c)&&z(d)&&(c=s(""+d));var f={id:a,uri:t.resolve(a),deps:c,factory:d};if(!f.uri&&L.attachEvent){var g=r();g&&(f.uri=g.src)}C("define",f),f.uri?t.save(f.uri,f):Z=f},t.save=function(a,b){var c=t.get(a);c.status<bb.SAVED&&(c.id=b.id||a,c.dependencies=b.deps||[],c.factory=b.factory,c.status=bb.SAVED)},t.get=function(a,b){return Y[a]||(Y[a]=new t(a,b))},t.use=function(b,c,d){var e=t.get(d,y(b)?b:[b]);e.callback=function(){for(var b=[],d=e.resolve(),f=0,g=d.length;g>f;f++)b[f]=Y[d[f]].exec();c&&c.apply(a,b),delete e.callback},e.load()},t.preload=function(a){var b=v.preload,c=b.length;c?t.use(b,function(){b.splice(0,c),t.preload(a)},v.cwd+"_preload_"+d()):a()},u.use=function(a,b){return t.preload(function(){t.use(a,b,v.cwd+"_use_"+d())}),u},t.define.cmd={},a.define=t.define,u.Module=t,v.fetchedList=_,v.cid=d,u.require=function(a){var b=t.get(t.resolve(a));return b.status<bb.EXECUTING&&(b.onload(),b.exec()),b.exports};var cb=/^(.+?\/)(\?\?)?(seajs\/)+/;v.base=(P.match(cb)||["",P])[1],v.dir=P,v.cwd=M,v.charset="utf-8",v.preload=function(){var a=[],b=location.search.replace(/(seajs-\w+)(&|$)/g,"$1=1$2");return b+=" "+L.cookie,b.replace(/(seajs-\w+)=1/g,function(b,c){a.push(c)}),a}(),u.config=function(a){for(var b in a){var c=a[b],d=v[b];if(d&&w(d))for(var e in c)d[e]=c[e];else y(d)?c=d.concat(c):"base"===b&&("/"!==c.slice(-1)&&(c+="/"),c=l(c)),v[b]=c}return C("config",a),u}}}(this);

define("app", [ "./pages/add", "./components/typeConfig", "./pages/login", "./pages/index", "./pages/list", "./components/utils", "./pages/search", "./pages/me", "./pages/removeBook" ], function(require, exports, module) {
    var add = require("./pages/add"), login = require("./pages/login"), index = require("./pages/index"), list = require("./pages/list"), search = require("./pages/search"), me = require("./pages/me"), removeBook = require("./pages/removeBook"), app = {};
    app.init = function() {
        $(document).ready(function() {
            //GLOBAL
            $("body").css({
                "min-height": window.innerHeight
            });
            if ($(".alert-danger").is(":visible")) {
                $(".alert-danger").fadeOut(3e3);
            }
            //pages
            add.init();
            login.init();
            index.init();
            list.init();
            search.init();
            me.init();
            removeBook.init();
        });
    };
    module.exports = app;
});
define("components/typeConfig", [], function(require, exports, module) {
    var typeConfig = {
        typeList: [ "文学", "少儿", "教育", "管理", "励志与成功", "人文社科", "生活", "艺术", "科技", "计算机与互联网" ],
        "文学": [ "中国当代小说", "侦探/悬疑/推理", "外国小说", "散文/随笔/书信", "世界名著", "魔幻/奇幻/玄幻", "惊悚/恐怖", "历史", "官场", "情感/家庭/婚姻", "武侠", "科幻小说", "中国古典小说", "中国文学", "诗歌", "词曲", "军事", "名家作品", "外国文学", "历史人物", "小说作品集", "影视小说", "都市", "四大名著", "文学家", "文学评论与研究", "社会", "文学作品集", "政治人物", "经典传记", "纪实文学", "自传", "领袖首脑", "职场", "女性人物", "财经人物", "爱情/情感", "影视文学", "文学理论", "文娱明星", "儿童文学", "大陆动漫", "爆笑漫画", "日本动漫", "绘本", "其他国外漫画", "连环画", "动漫学堂", "轻小说" ],
        "少儿": [ "动漫/卡通", "传统文化", "儿童教育", "儿童文学", "幼儿启蒙", "手工/游戏", "音乐/舞蹈", "智力开发", "科普/百科", "励志/成长", "少儿英语", "0-2岁", "3-6岁", "7-10岁", "11-14岁", "笑话/幽默", "绘本", "美术/书法", "入园准备及教材" ],
        "管理": [ "市场营销", "人力资源管理", "企业管理与培训", "管理学", "财务管理", "MBA与工商管理", "生产与运作管理", "企业与企业家", "项目管理", "领导学", "电子商务", "战略管理", "管理通俗读物", "供应链管理", "商务实务", "经济经典著作", "世界经济", "中国经济", "会计、审计", "经济学理论", "经济通俗读物", "经济体制与改革", "职业资格考试", "行业经济", "财政税收", "贸易经济", "股票", "投资", "个人理财", "期货", "证券", "国际金融", "基金", "保险", "金融理论", "货币银行学", "企业并购" ],
        "励志与成功": [ "经典著作", "演讲与口才", "自我完善", "智力与谋略", "自我调节", "青少年励志/大学生指南", "性格/习惯", "男性励志", "情商管理", "名人励志", "个人形象", "行业成功指南", "智慧格言", "大师谈励志", "文明礼仪", "励志小品", "创业必修" ],
        "人文社科": [ "史学理论", "历史经典著作", "世界史", "中国史", "史家名著", "逸闻野史", "文物考古", "通俗说史", "地方史志", "心理学经典著作", "大众心理学", "社会心理学", "应用心理学", "政治经典著作", "世界政治", "中国军事", "世界军事", "军事技术", "战略战术战役", "武器装备", "军事文学", "军事史", "国学名家", "国学普及读物", "集部", "哲学经典著作", "中国哲学", "西方哲学", "宗教经典著作", "佛教研究著作", "基督教", "道教", "理论法学", "刑法", "民法", "法律实务", "民俗文化", "世界各国文化", "社会科学经典著作", "社会学" ],
        "生活": [ "家常菜谱", "手工DIY", "两性关系", "家庭园艺", "生活指南", "风水/占卜", "宠物", "美容护肤", "服饰搭配", "减肥瘦身", "彩妆/美发/美甲", "孕产知识", "育儿/亲子", "家教理论", "胎教/早教", "母婴喂养/护理", "旅游随笔", "国外游", "国内游", "自助游", "旅游指南", "旅游摄影", "分省/区域/城市地图", "旅游地图", "中医保健", "养生", "运动健身", "瑜伽/美体", "保健食谱", "两性健康", "家庭保健", "中老年健康", "孕产妇保健", "体育/运动" ],
        "艺术": [ "摄影", "绘画", "设计", "连环画", "音乐", "鉴赏收藏", "书法篆刻", "动画", "舞蹈", "雕塑", "民间艺术", "工艺美术", "舞台艺术戏剧", "建筑", "艺术史", "艺术理论/评论", "各国艺术概况", "艺术辞典与工具", "艺术品拍卖", "艺术类考试", "影视" ],
        "科技": [ "科普图鉴", "地球科学", "数理化", "天文航天", "生物世界", "神秘现象", "百科知识", "通信", "基本电子电路", "微电子学、集成电路", "移动通信", "电子元件、组件", "无线电设备、电信设备", "半导体技术", "光电子技术、激光技术", "电工电气", "机械、仪表工业", "自动化技术", "汽车与车辆", "交通运输", "能源与动力工程", "水利水电", "科技参考工具书", "中国医学", "基础医学", "临床医学", "护理学", "内科学", "外科学", "肿瘤学", "药学", "园林景观", "城乡建设、市政工程", "城市规划、城市设计", "室内设计、装饰装修", "建筑工具书", "建筑标准和规范", "建筑法律法规", "畜牧、狩猎、蚕、蜂", "水产、渔业" ],
        "计算机与互联网": [ "编程语言与程序设计", "软件工程及软件方法学", "数据库", "操作系统", "网络/通信", "办公软件", "数码设计", "网页制作", "电子商务", "IT服务管理", "数码产品攻略", "专用软件", "考试认证", "游戏", "硬件与维护", "单片机与嵌入式", "计算机工具书", "计算机期刊", "辅助设计与工程计算", "信息系统", "计算机理论、基础知识", "计算机安全", "计算机组织与体系结构", "人工智能", "新手学电脑", "计算机控制与仿真" ],
        "教育": [ "小学通用", "初中通用", "高中通用", "中小学作文辅导", "中小学课外读物", "竞赛/奥赛", "小学升初中", "学习方法/报考指南", "中考", "字帖", "大学教材", "成人教育/自考", "国家公务员", "地方公务员", "公务员考试面试", "事业单位考试", "考研政治", "考研英语", "考研数学", "考研专业书", "会计类考试", "证券从业资格考试", "计算机考试", "司法考试", "医学类考试", "建筑类考试", "艺术类考试", "同等学力考试", "MBA/MPA/MPACC", "GCT（工程硕士）联考", "法硕/金融联考", "在职硕士考试", "成人高考/自考", "日语", "韩语", "英语口语", "英语词汇", "英语读物", "英语四/六级...", "英语专业四/八级考试", "雅思IELTS", "托福TOEFL", "GRE/GMAT" ]
    };
    module.exports = typeConfig;
});
define("components/utils", [], function(require, exports, module) {
    var utils = {};
    utils.getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);
        //匹配目标参数
        if (r !== null) {
            // return unescape(r[2]);
            return decodeURIComponent(r[2]);
        }
        return null;
    };
    module.exports = utils;
});
define("pages/add", [ "../components/typeConfig" ], function(require, exports, module) {
    var typeConfig = require("../components/typeConfig"), $type = $(".addBook #type"), $subType = $(".addBook #subType"), typeList = typeConfig.typeList, typeListHtml, page = {};
    //生成副类别列表
    function createSubType($subType, subTypeList) {
        var subTypeListHtml;
        for (var i = 0, l = subTypeList.length; i < l; i++) {
            subTypeListHtml += '<option value="' + subTypeList[i] + '">' + subTypeList[i] + "</option>";
        }
        $subType.html(subTypeListHtml);
    }
    page.init = function() {
        //更换副类别列表
        $type.change(function() {
            $subType.empty();
            var val = $(this).children("option:selected").val(), subTypeList = typeConfig[val];
            createSubType($subType, subTypeList);
        });
        //生成主类别列表
        for (var i = 0, l = typeList.length; i < l; i++) {
            typeListHtml += '<option value="' + typeList[i] + '">' + typeList[i] + "</option>";
        }
        $type.html(typeListHtml);
        if ($type.attr("data-selected")) {
            $type.find("option").each(function() {
                if ($(this).val() === $type.attr("data-selected")) {
                    $(this).attr("selected", "selected");
                }
            });
            createSubType($subType, typeConfig[$type.attr("data-selected")]);
        } else {
            createSubType($subType, typeConfig[typeList[0]]);
        }
        //编辑个人资料页验证
        $("#addForm").validate({
            onBlur: true,
            eachValidField: function() {
                $(this).closest(".validateInput").removeClass("has-error").addClass("has-success");
            },
            eachInvalidField: function() {
                $(this).closest(".validateInput").removeClass("has-success").addClass("has-error");
            }
        });
    };
    module.exports = page;
});
define("pages/index", [ "../components/typeConfig" ], function(require, exports, module) {
    var page = {};
    var typeConfig = require("../components/typeConfig"), typeList = typeConfig.typeList, $menu = $("#bookMenu");
    //判断获取身份的函数
    function getIdentity() {
        return $(".topbar").attr("data-identity");
    }
    page.init = function() {
        //生成图书菜单
        var listHtml, id = getIdentity();
        for (var i = 0, l = typeList.length; i < l; i++) {
            if (id === "student") {
                listHtml = listHtml ? listHtml + '<li data-subMenu="0" data-val="' + typeList[i] + '"><a href="/list?type=' + typeList[i] + '">' + typeList[i] + '</a><div class="bookSubMenuWrap"><ul class="bookSubMenu cf"></ul></div></li>' : '<li data-subMenu="0" data-val="' + typeList[i] + '"><a href="/list?type=' + typeList[i] + '">' + typeList[i] + '</a><div class="bookSubMenuWrap"><ul class="bookSubMenu cf"></ul></div></li>';
            } else if (id === "admin") {
                listHtml = listHtml ? listHtml + '<li data-subMenu="0" data-val="' + typeList[i] + '"><a href="/table?type=' + typeList[i] + '">' + typeList[i] + '</a><div class="bookSubMenuWrap"><ul class="bookSubMenu cf"></ul></div></li>' : '<li data-subMenu="0" data-val="' + typeList[i] + '"><a href="/table?type=' + typeList[i] + '">' + typeList[i] + '</a><div class="bookSubMenuWrap"><ul class="bookSubMenu cf"></ul></div></li>';
            }
        }
        $menu.html(listHtml);
        //生成图书副类别列表
        $menu.children("li").mouseover(function() {
            var $this = $(this), subListHtml, type = $this.attr("data-val"), flag = $this.attr("data-subMenu"), id = getIdentity();
            if (Number(flag) === 0) {
                for (var i = 0, l = typeConfig[type].length; i < l; i++) {
                    if (id === "student") {
                        subListHtml = subListHtml ? subListHtml + '<li><a href="/list?type=' + type + "&subtype=" + typeConfig[type][i] + '">' + typeConfig[type][i] + "</a></li>" : '<li><a href="/list?type=' + type + "&subtype=" + typeConfig[type][i] + '">' + typeConfig[type][i] + "</a></li>";
                    } else if (id === "admin") {
                        subListHtml = subListHtml ? subListHtml + '<li><a href="/table?type=' + type + "&subtype=" + typeConfig[type][i] + '">' + typeConfig[type][i] + "</a></li>" : '<li><a href="/table?type=' + type + "&subtype=" + typeConfig[type][i] + '">' + typeConfig[type][i] + "</a></li>";
                    }
                }
                $this.find(".bookSubMenu").html(subListHtml);
                $this.attr("data-subMenu", 1);
            } else {
                $this.find(".bookSubMenuWrap").show();
            }
        }).mouseout(function() {
            $(this).find(".bookSubMenuWrap").hide();
        });
        //搜索框focus时候的样式变化
        $(".indexWrap #search-book").focus(function() {
            $(this).parents(".input-group").addClass("focus");
        }).focusout(function() {
            $(this).parents(".input-group").removeClass("focus");
        });
    };
    module.exports = page;
});
define("pages/list", [ "../components/utils" ], function(require, exports, module) {
    var utils = require("../components/utils"), sort = utils.getUrlParam("sort"), type = utils.getUrlParam("type"), subtype = utils.getUrlParam("subtype"), lendable = utils.getUrlParam("lendable"), page = {};
    function generateHref(type, subtype, sort, lendable) {
        var href = "/list?type=" + type;
        if (subtype) {
            href += "&subtype=" + subtype;
        }
        if (sort) {
            href += "&sort=" + sort;
        }
        if (lendable) {
            href += "&lendable=" + lendable;
        }
        return href;
    }
    page.init = function() {
        //初始化filter排序选项的样式
        if (!sort) {
            $("#sort-default").addClass("active");
        } else if (sort === "time") {
            $("#sort-time").addClass("active");
        } else if (sort === "recommand") {
            $("#sort-recommand").addClass("active");
        }
        if (lendable) {
            $(".lendableLabel").addClass("checked");
        }
        //只显示可借图书
        $("#lendable").change(function() {
            var href;
            if ($(".lendableLabel").hasClass("checked")) {
                href = generateHref(type, subtype, sort, true);
            } else {
                href = generateHref(type, subtype, sort, false);
            }
            window.location.href = href;
        });
    };
    module.exports = page;
});
define("pages/login", [], function(require, exports, module) {
    var page = {};
    page.init = function() {
        $(".login-screen").height(window.innerHeight);
        //切换提示语
        $('input[name="identity"]').change(function() {
            var identity = $('input[name="identity"]:checked').val();
            if (identity === "student") {
                $('input[name="no"]').attr("placeholder", "请输入学号");
            } else if (identity === "admin") {
                $('input[name="no"]').attr("placeholder", "请输入工号");
            }
        });
        $("#signUpForm, #login-form").validate({
            onBlur: true,
            eachValidField: function() {
                $(this).closest(".validateInput").removeClass("has-error").addClass("has-success");
            },
            eachInvalidField: function() {
                $(this).closest(".validateInput").removeClass("has-success").addClass("has-error");
            }
        });
    };
    module.exports = page;
});
define("pages/me", [ "../components/utils" ], function(require, exports, module) {
    var page = {}, utils = require("../components/utils");
    //计算两个日期的时间间隔 
    function compareDate(start, end) {
        if (start === null || start.length === 0 || end === null || end.length === 0) {
            return 0;
        }
        var arrs;
        arrs = start.split("-");
        var starttime = new Date(arrs[0], parseInt(arrs[1] - 1), arrs[2]);
        var starttimes = starttime.getTime();
        arrs = end.split("-");
        var endtime = new Date(arrs[0], parseInt(arrs[1] - 1), arrs[2]);
        var endtimes = endtime.getTime();
        var intervalTime = endtimes - starttimes;
        //两个日期相差的毫秒数 一天86400000毫秒 
        var Inter_Days = intervalTime.toFixed(2) / 864e5 + 1;
        //加1，是让同一天的两个日期返回一天 
        return Inter_Days;
    }
    page.init = function() {
        var $menu = $("#menu-s");
        //显示顶部Menu
        var mePath = window.location.pathname.substring(1);
        if (mePath === "borrow" || mePath === "returning" || mePath === "favo" || mePath === "myInfo") {
            $menu.show();
            //样式
            $menu.find('[data-value="' + mePath + '"]').addClass("cur");
            if (mePath === "returning") {
                $menu.find('[data-value="borrow"]').addClass("cur");
            }
        } else {
            $menu.hide();
        }
        //计算相距时间
        var today = new Date().toJSON().substring(0, 10);
        $(".interval").each(function() {
            var $this = $(this), end = $this.attr("data-end");
            var interval = compareDate(today, end);
            $this.html(interval);
        });
        var page = window.location.pathname.substring(1);
        //选择框的样式
        $("#returnOrNot").find('[value="' + page + '"]').attr("selected", "selected");
        $("#returnOrNot").selectpicker({
            style: "btn-hg btn-primary",
            menuStyle: "dropdown-inverse"
        });
        //更改换了的书还是未还书
        $("#returnOrNot").change(function() {
            var val = $(this).val();
            window.location.href = "/" + val;
        });
        //收藏夹选择框
        var lendable = utils.getUrlParam("lendable");
        $("#favo-select").find('[value="' + lendable + '"]').attr("selected", "selected");
        $("#favo-select").selectpicker({
            style: "btn-hg btn-primary",
            menuStyle: "dropdown-inverse"
        });
        //收藏夹可借还是不可借
        $("#favo-select").change(function() {
            var val = $(this).val();
            window.location.href = "/favo?lendable=" + val;
        });
        //收藏夹设置提醒的tooltip
        $("#remindBtn").mouseover(function() {
            $(".favoList .tooltip").show();
        }).mouseout(function() {
            $(".favoList .tooltip").hide();
        });
        //编辑个人资料页的tooltip
        $("#myInfoForm #email").focus(function() {
            $("#myInfoForm .tooltip").show();
        }).blur(function() {
            $("#myInfoForm .tooltip").hide();
        });
        //编辑个人资料页修改密码
        $("body").on("click", "#myInfoForm .changePwd", function() {
            $('#myInfoForm input[name="password"]').removeAttr("disabled");
            $("#myInfoForm .passwordRepeatWrap").show();
            $('#myInfoForm label[for="password"]').html('新密码 <span class="cancelPwd">取消</span>');
        });
        $("body").on("click", "#myInfoForm .cancelPwd", function() {
            $('#myInfoForm input[name="password"]').attr("disabled", "disabled");
            $("#myInfoForm .passwordRepeatWrap").hide();
            $('#myInfoForm label[for="password"]').html('密码 <span class="changePwd">修改密码</span>');
        });
        //编辑个人资料页没有需改不允许提交
        $("#myInfoForm input").change(function() {
            $("#myInfoForm .submitBtn").removeAttr("disabled");
        });
        //编辑个人资料页验证
        $("#myInfoForm").validate({
            onBlur: true,
            eachValidField: function() {
                $(this).closest(".validateInput").removeClass("has-error").addClass("has-success");
            },
            eachInvalidField: function() {
                $(this).closest(".validateInput").removeClass("has-success").addClass("has-error");
            }
        });
    };
    module.exports = page;
});
define("pages/removeBook", [], function(require, exports, module) {
    var page = {};
    page.init = function() {
        $(".removeBookBtn").click(function(e) {
            e.preventDefault();
            $(".removeWarning").show();
        });
        $(".cancelRemoveBtn").click(function(e) {
            e.preventDefault();
            $(".removeWarning").hide();
        });
    };
    module.exports = page;
});
define("pages/search", [ "../components/utils" ], function(require, exports, module) {
    var utils = require("../components/utils"), page = {}, w = utils.getUrlParam("keyword"), by = utils.getUrlParam("by"), prefix = "/search?keyword=" + w;
    page.init = function() {
        //选择框的样式
        $("#bOrA").find('[value="' + by + '"]').attr("selected", "selected");
        $("#bOrA").selectpicker({
            style: "btn-hg btn-primary",
            menuStyle: "dropdown-inverse"
        });
        //显示关键字
        $("#skw").html(w);
        //更改作者或是图书
        $("#bOrA").change(function() {
            var val = $(this).val();
            window.location.href = "/me/" + val;
        });
    };
    module.exports = page;
});