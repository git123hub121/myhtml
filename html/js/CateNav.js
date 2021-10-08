/*
 * @Author: 你爸爸lzm
 * @Date: 2016-12-07 15:12:17
 * @Notes: 使用built命令快速得到一些常用的snippets,右击py文件可以preview代码
 * @LastEditTime: 2021-04-21 23:22:20
 */
jQuery.CateNav = function (elem1, elem2) {
	//添加目录
	var currObj;
	var offsetTop = 0;
	var h2List = new Array(), h3List = new Array();

	var addNav = function () {
		var i1 = 0, i2 = 0, n1 = 0, n2 = 0;
		var temp = '';
		var cateList = $(elem1).html().match(/(<h2[^>]*>.*?<\/h2>)/ig);
		for (var i = 0; i < cateList.length; i++) {
			if (/(<h2[^>]*>.*?<\/h2>)/ig.test(cateList[i])) {
				n1++;
				n2 = 0;
				temp += '<dd class="cate-item1"><a href="#' + n1 + '">' + cateList[i].replace(/<[^>].*?>/g, "") + '</a></dd>';
				h2List[i1] = n1;
				i1++;
			} else {
				n2++;
				temp += '<a href="#' + n1 + '_' + n2 + '">' + cateList[i].replace(/<[^>].*?>/g, "") + '</a>';
				h3List[i2] = n1 + '_' + n2;
				i2++;
			}
		}
		temp += '';
		$(elem2).append(temp);
	};
	//添加锚点
	var addPoint = function () {
		var i1 = i2 = 0;
		$(elem1).find('h2').each(function () {
			$(this).prepend('<a name="' + h2List[i1] + '"></a>');
			i1++;
		});
	};
	//点击锚点，跳转制定位置
	var clickPoint = function () {
		$(elem2 + ' a').click(function (e) {
			e.preventDefault();
			currObj = $("[name='" + $(this).attr('href').replace(/#/, '') + "']");
			offsetTop = currObj.offset().top - 40;
			$('html,body').animate({
				scrollTop: offsetTop
			}, 500, 'swing');
		});
	};
	//屏幕滚动，显示并选中锚点
	var scrollWin = function () {
		var windowTop = 0;
		$(window).scroll(function () {
			windowTop = $(window).scrollTop();
			// if(windowTop>=$(elem1).offset().top){
			// 	$(elem2).slideDown(750);
			// }else{
			// 	$(elem2).slideUp(750);
			// }
			$(elem2 + 'a').each(function () {
				currObj = $("[name='" + $(this).attr('href').replace(/#/, '') + "']");
				offsetTop = currObj.offset().top;
				if (windowTop > offsetTop) {
					$(elem2 + 'dd').removeClass('active');
					$(this).parent('dd').addClass('active');
					return;
				}
			});
		});
	};
	var init = function () {
		addNav();
		addPoint();
		clickPoint();
		scrollWin();
	}
	init();
}