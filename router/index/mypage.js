module.exports = function(app) {
    const dateUtils = require('date-utils');
    const mysqlDbc = require('../../mysql/mysqlConnector');
    app.get('/mypage', function(req, res) {

        if (!res.locals.isLogin) {
            res.redirect('/');
            return;
        }

        currentUser = res.locals.user;

        var communityGG = mysqlDbc.query('gg', 'selectUserGG', {
            uid: currentUser.uid
        });
        var selectBadgeInfoAll = mysqlDbc.query('badge_info', 'selectBadgeInfoAll');
        var selectUserBadge = mysqlDbc.query('badge', 'selectUserBadge', {
            uid: currentUser.uid
        });
        // console.log(selectUserBadge);
        res.render('mypage', {
            title: "블루바이칼",
            sum_gg: currentUser.sum_gg,
            rgc: currentUser.test_rgc,
            gold: currentUser.gold,
            img_src: currentUser.img_src,
            created_at: currentUser.created_at,
            communityGG: communityGG,
            nickname: currentUser.nickname,
            selectBadgeInfo: selectBadgeInfoAll,
            selectUserBadge: selectUserBadge
        })
    });
    // badge 변경
    app.post('/mypage/changeBadge', function(req, res) {
        if (!res.locals.isLogin) {
            res.redirect('/')
            return;
        }
        currentUser = res.locals.user;
        var nowDate = new Date();
        var nowDateStr = nowDate.toFormat('YYYYMMDDHH24MISS');
        var badgeSeq = Number(req.body.selectBadgeSeq);

        // var selectBadgeInfo = mysqlDbc.query('badge_info', 'selectBadgeInfo', {
        //     seq: badgeSeq
        // });

        mysqlDbc.query('user', 'updateUserBadge', {
            uid: currentUser.uid,
            // badge_seq: selectBadgeInfo[0].seq,
            badge_seq: badgeSeq,
            updated_at: nowDateStr
        });

        var selectSessionUser = mysqlDbc.query('user', 'selectUserId', {
            id: currentUser.id
        });
        req.session.user = selectSessionUser[0];

        res.json({
            result: 'success'
        });
    });
    // badge 구매 ajax post
    app.post('/mypage/buyBadge', function(req, res) {
        if (!res.locals.isLogin) {
            res.redirect('/')
            return;
        }

        currentUser = res.locals.user;
        var nowDate = new Date();
        var nowDateStr = nowDate.toFormat('YYYYMMDDHH24MISS');
        //  badge_seq
        var badgeSeq = Number(req.body.badgeSeq);

        var badgePrice = Number(req.body.badgePrice);

        var selectUserBadge = mysqlDbc.query('badge', 'selectUserBadge', {
            uid: currentUser.uid
        });
        var check = 1;

        for (var i in selectUserBadge) {
            if (badgeSeq == selectUserBadge[i].badge_seq) {
                check = 0;
            }
        }

        // if(badgeSeq == selectBadgeSeq)

        if (currentUser.gold >= badgePrice && check == 1) {
            // var selectBadgeInfo = mysqlDbc.query('badge_info', 'selectBadgeInfo', {
            //     seq: badgeSeq
            // });

            var nowDate = new Date();
            var nowDateStr = nowDate.toFormat('YYYYMMDDHH24MISS');
            changeGold = Number(currentUser.gold) - badgePrice
            mysqlDbc.query('user', 'updateUserGold', {
                uid: currentUser.uid,
                gold: changeGold,
                updated_at: nowDateStr
            });

            mysqlDbc.query('badge', 'insertUserBadge', {
                uid: currentUser.uid,
                // badge_seq: selectBadgeInfo[0].seq,
                badge_seq: badgeSeq,
                created_at: nowDateStr
            });
            mysqlDbc.query('user', 'updateUserBadge', {
                uid: currentUser.uid,
                // badge_seq: selectBadgeInfo[0].seq,
                badge_seq: badgeSeq,
                updated_at: nowDateStr
            });
            var selectSessionUser = mysqlDbc.query('user', 'selectUserId', {
                id: currentUser.id
            });
            var selectSessionUser = mysqlDbc.query('user', 'selectUserId', {
                id: currentUser.id
            });

            req.session.user = selectSessionUser[0];

            res.json({
                result: 'success'
            });
        } else if (check == 0) {
            res.json({
                result: 'already'
            });
        } else {
            res.json({
                result: 'fail'
            });
        }
    });

    // gg to gold 전환 ajax post
    app.post('/mypage/gold', function(req, res) {
        if (!res.locals.isLogin) {
            res.redirect('/');
            return;
        }
        var nowDate = new Date();
        var nowDateStr = nowDate.toFormat('YYYYMMDDHH24MISS');
        currentUser = res.locals.user;

        var communityType = req.body.communityType;
        var gg = Number(req.body.gg);
        var checkGG = mysqlDbc.query('gg', 'selectCommunityGG', {
            uid: currentUser.uid,
            community_type: communityType
        })
        changeGG = Number(checkGG[0].gg) - gg;
        changeGold = Number(currentUser.gold) + Number(gg);


        if (checkGG[0].gg >= gg) {
            mysqlDbc.query('gg', 'updateCommunityGG', {
                uid: currentUser.uid,
                community_type: communityType,
                gg: changeGG,
                updated_at: nowDateStr
            })
            mysqlDbc.query('user', 'updateUserGold', {
                uid: currentUser.uid,
                gold: changeGold,
                updated_at: nowDateStr
            })

            var selectSessionUser = mysqlDbc.query('user', 'selectUserId', {
                id: currentUser.id
            });

            req.session.user = selectSessionUser[0];

            res.json({
                result: 'success'
            });
        } else {
            res.json({
                result: 'fail'
            });
        }
    });

}