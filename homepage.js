{
    'use strict';

    // ページ内遷移機能
    window.addEventListener('DOMContentLoaded', () => {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        const anchorLinksArr = Array.prototype.slice.call(anchorLinks);
        // ヘッダーの要素を取得する
        const header = document.querySelector('#header');
      
        anchorLinksArr.forEach(link => {
            link.addEventListener('click', e => {
                // ①ブラウザのデフォルトの挙動を止める
                e.preventDefault();
                // ②ターゲットの要素を取得する
                const targetId = link.hash;
                const targetElement = document.querySelector(targetId);
                // ③ターゲットの要素のページ上端からの位置座標を取得
                const targetOffsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top;
                // ヘッダーの高さを取得する
                const headerHeight = header.offsetHeight;
                // ヘッダーの高さを引いたトータルのスクロール量を計算する
                const totalScrollAmount = targetOffsetTop - headerHeight;
                // ④ターゲットの要素の位置までスムーススクロールさせる
                window.scrollTo({
                    top: totalScrollAmount,
                    behavior: "smooth"
                });
            });
        });
    });

    // スライドショー機能
    window.addEventListener('load', function () {
        viewSlide('.slide img');
    });
    function viewSlide(className, slideNo = 0){
        let imgArray = document.querySelectorAll(className);
        if (slideNo >= 0) {
            //初回以外は現在のスライドを消す
            imgArray[slideNo].style.opacity = 0;
        };
        slideNo++;
        if (slideNo >= imgArray.length) {
            slideNo = 0; //次のスライドがなければ最初のスライドへ戻る
        };
        imgArray[slideNo].style.opacity = 0.7;
        const slidetime = 4000;
        setTimeout(function(){viewSlide(className, slideNo)}, slidetime);
    };

    // スクロールフェイドイン機能
    let fadeInTarget = document.querySelectorAll('.fade-in');
    window.addEventListener('scroll', () => {
        for (let i = 0; i < fadeInTarget.length; i++){
            const scroll = window.pageYOffset || document.documentElement.scrollTop;
            const rect = fadeInTarget[i].getBoundingClientRect().top;
            const offset = scroll + rect;
            const windowHeight = window.innerHeight; // 現在のブラウザの高さ
            if (scroll > offset - windowHeight + 150) {
            fadeInTarget[i].classList.add('scroll-in');
            }
        }
    });
}