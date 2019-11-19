window.onload = function () {
   var weixin = "974880348"
   var clipboard = new Clipboard('.copy_btn');
   clipboard.on('success', function (e) {
      var dialog1 = $(document).dialog({
         type: 'confirm',
         closeBtnShow: true,
         overlayClose: true,
         content: 'QQ号复制成功，打开QQ进行添加',
         onClickConfirmBtn: function () {
            // window.location.href = 'weixin://';
            openqq();
         }
      });

      /* setTimeout(function () {
          window.location.href = 'weixin://';
      }, 3000); */

      e.clearSelection();
   });

   pushHistory();

   window.addEventListener("popstate", function (e) {
      pushHistory();
      var dialog2 = $(document).dialog({
         type: 'alert',
         closeBtnShow: true,
         overlayClose: true,
         // content: '<div><p>恭喜获得客服指导一次，点击添加客服微信</p><p style="font-size:22px;text-align: center;color: red; ">立刻添加微信</p></div>',
         content: '<div><p>幸运飞艇 时时彩 赛车pk10 分分彩 加拿大28等最新<span style="color: red">必中投注漏洞</span>，<span style="color: red">回血计划</span>期期中，点击确定加<span style="color: red">大神Q<em></em><em></em>Q</span>看计划，每日还有不定时福利，跟计划走简单带你<span style="color: red">日入过万</span>！</p></div>',
         //   content:'<p>恭喜您获得免费获得客服指导一次</p><p style="font-size:22px;text-align: center;color: red; ">请手动添加微信微信号</p>',
         onClickConfirmBtn: function () {
            //   $('#target').click();
            // window.location.href = 'weixin://';
            // $(".dialog-content").closeAll();
            openqq();
         }

      });


   }, false);

   function pushHistory() {
      var state = {
         title: "title",
         url: "#"
      };
      window.history.pushState(state, "title", "#");
   }

   function openqq() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
         window.location.href = "mqqwpa://im/chat?chat_type=wpa&uin=" + weixin + "&version=1&src_type=web&web_src=oicqzone.com";
      } else {
         //window.location.href= "http://wpa.qq.com/msgrd?v=3&uin="+ stxlwx +"&site=qq&menu=yes"
         window.location.href = " tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=" + weixin + "&website=www.oicqzone.com";
      }
   }
}