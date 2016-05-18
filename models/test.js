/**
 * Created by eating on 16/5/16.
 */
var request = require('request'), jsdom = require('jsdom'),moment = require('moment');

var synchronize = function(){
    request.get({
        url:'http://www.icbc.com.cn/ICBCDynamicSite2/other/rmbcredit.aspx',
    }, function (err, response, body){
        if(err) throw err;
       // console.log(body);
        console.warn('get: http://www.icbc.com.cn/ICBCDynamicSite2/other/rmbcredit.aspx');
        jsdom.env(body, ['https://code.jquery.com/jquery-2.2.3.min.js'], function (err, window){
            if(err) throw err;
            var $ = window.jQuery;
            var $option = $('option');
            var dateArray = [];
            $option.each(function(i,item){
                    if(i !== 0){
                        dateArray.push(moment(item.text).toDate());
                    }
                }
            );
            for(i in dateArray){
                console.log(dateArray[i]);
            }
            var $table = $('table');
            //$table.each(function(i,item){
            //    if(i == 4){
            //        var td = $(item).find('td').first().text();
            //        console.log(td);
            //    }
            //});
           // console.log($($table[4]).find('td').first().text());
            //console.log($table[0]);
            var $item = $($table[4]).find('td');

            var returnRates = [];
            returnRates.push($($item[5]).text());
            returnRates.push($($item[7]).text());
            returnRates.push($($item[11]).text());
            returnRates.push($($item[13]).text());
            returnRates.push($($item[15]).text());

                console.log(returnRates[0]);



            //console.log($($item[5]).text());
            //console.log($($item[7]).text());
            //console.log($($item[11]).text());
            //console.log($($item[13]).text());
            //console.log($($item[15]).text());
            //console.log($($item).find('td').first().text());
        });
    });
};
var synchronizePost = function(){

    //request({
    //    url: 'http://www.icbc.com.cn/ICBCDynamicSite2/other/rmbcredit.aspx',
    //    method: 'POST',
    //    form:{
    //        __EVENTTARGET: '',
    //        __EVENTARGUMENT:'',
    //        __LASTFOCUS: '',
    //        _VIEWSTATE: '%2FwEPDwUJNDkwNDM1MTYwD2QWAgIDD2QWAgIBD2QWBmYPEGQPFiRmAgECAgIDAgQCBQIGAgcCCAIJAgoCCwIMAg0CDgIPAhACEQISAhMCFAIVAhYCFwIYAhkCGgIbAhwCHQIeAh8CIAIhAiICIxYkEAUP6K%2B36YCJ5oup5pe26Ze0ZWcQBQoyMDE1LTEwLTI0BQoyMDE1LTEwLTI0ZxAFCjIwMTUtMDgtMjYFCjIwMTUtMDgtMjZnEAUKMjAxNS0wNi0yOAUKMjAxNS0wNi0yOGcQBQoyMDE1LTA1LTExBQoyMDE1LTA1LTExZxAFCjIwMTUtMDMtMDEFCjIwMTUtMDMtMDFnEAUKMjAxNC0xMS0yMgUKMjAxNC0xMS0yMmcQBQoyMDEyLTA3LTA2BQoyM' +
    //        'DEyLTA3LTA2ZxAFCjIwMTItMDYtMDgFCjIwMTItMDYtMDhnEAUKMjAxMS0wNy0wNwUKMjAxMS0wNy0wN2cQBQoyMDExLTA0LTA2BQoyMDExLTA0LTA2ZxAFCjIwMTEtMDItMDkFCjIwMTEtMDItMDlnEAUKMjAxMC0xMi0yNgUKMjAxMC0xMi0yNmcQBQoyMDEwLTEwLTIwBQoyMDEwLTEwLTIwZxAFCjIwMDgtMTItMjMFCjIwMDgtMTItMjNnEAUKMjAwOC0xMS0yNwUKMjAwOC0xMS0yN2cQBQoyMDA4LTEwLTMwBQoyMDA4LTEwLTMwZxAFCjIwMDgtMTAtMDkFCjIwMDgtMTAtMDlnEAUKMjAwOC0wOS0xNgUKMjAwOC0wOS0xNmcQBQoyMDA3LTEyLTIxBQoyMDA3LTE' +
    //        'yLTIxZxAFCjIwMDctMDktMTUFCjIwMDctMDktMTVnEAUKMjAwNy0wOC0yMgUKMjAwNy0wOC0yMmcQBQoyMDA3LTA3LTIxBQoyMDA3LTA3LTIxZxAFCjIwMDctMDUtMTkFCjIwMDctMDUtMTlnEAUKMjAwNy0wMy0xOAUKMjAwNy0wMy0xOGcQBQoyMDA2LTA4LTE5BQoyMDA2LTA4LTE5ZxAFCjIwMDYtMDQtMjgFCjIwMDYtMDQtMjhnEAUKMjAwNC0xMC0yOQUKMjAwNC0xMC0yOWcQBQoyMDAyLTAyLTIxBQoyMDAyLTAyLTIxZxAFCjE5OTktMDYtMTAFCjE5OTktMDYtMTBnEAUKMTk5OC0xMi0wNwUKMTk5OC0xMi0wN2cQBQoxOTk4LTA3LTAxBQoxOTk4LTA3LTAxZxA' +
    //        'FCjE5OTgtMDMtMjUFCjE5OTgtMDMtMjVnEAUKMTk5Ny0xMC0yMwUKMTk5Ny0xMC0yM2cQBQoxOTk2LTA4LTIzBQoxOTk2LTA4LTIzZxAFCjE5OTYtMDUtMDEFCjE5OTYtMDUtMDFnFgFmZAIBDxYCHgRUZXh0BQoyMDA2LTA4LTE5ZAICDxYCHwAFxAs8dGFibGUgYm9yZGVyPScxJyBjZWxscGFkZGluZz0nMCcgY2VsbHNwYWNpbmc9JzAnIHdpZHRoPSc4NSUnICBydWxlcz0nYWxsJyBmcmFtZT0nYm9yZGVyJyBzdHlsZT0nYm9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlOyBib3JkZXItY29sb3I6ICNDQ0NDQ0M7Jz48dGJvZHk%2BPHRyIHN0eWxlPSd3aWR0aDoxMDAlJz' +
    //        '48dGQgd2lkdGg9JzU3JScgIGJnY29sb3I9JyNlOGU4ZTgnIFZBTElHTj0ndG9wJz7jgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDnp43nsbs8YnI%2BPGRpdiBhbGlnbj0nbGVmdCc%2BJm5ic3A76aG555uuPC9kaXY%2BPC90ZD48dGQgd2lkdGg9JzQzJScgYmdjb2xvcj0nI2U4ZThlOCcgaGVpZ2h0PSczMCcgYWxpZ249J2NlbnRlcic%2B5bm05Yip546HJTwvdGQ%2BPC90cj48dHIgc3R5bGU9J3dpZHRoOjEwMCUnPjx0ZCB3aWR0aD0nNDAlJz48ZGl2IGFsaWduPSdsZWZ0Jz7jgIDkuIDjgIHnn63mnJ%2FotLfmrL48L2Rpdj48L3RkPjx0ZCBo' +
    //        'ZWlnaHQ9JzE5JyB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJz4mbmJzcDs8L3RkPjwvdHI%2BPHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48dGQgd2lkdGg9JzQwJScgYWxpZ249J0NFTlRFUicgaGVpZ2h0PScxOSc%2B5YWt5Liq5pyI77yI5ZCr77yJPC90ZD48dGQgd2lkdGg9JzMwJScgYWxpZ249J2NlbnRlcicgaGVpZ2h0PScxOSc%2BNS41ODwvdGQ%2BPC90cj48dHIgc3R5bGU9J3dpZHRoOjEwMCUnPjx0ZCB3aWR0aD0nNDAlJyBhbGlnbj0nQ0VOVEVSJyBoZWlnaHQ9JzE5Jz7lha3kuKrmnIjoh7PkuIDlubTvvIjlkKvvvIk8L3RkPjx0ZCB3aWR0aD0nMzAlJyB' +
    //        'hbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz42LjEyPC90ZD48L3RyPjx0ciBzdHlsZT0nd2lkdGg6MTAwJSc%2BPHRkIHdpZHRoPSc0MCUnPjxkaXYgYWxpZ249J2xlZnQnPuOAgOS6jOOAgeS4remVv%2Bacn%2Bi0t%2BasvjwvZGl2PjwvdGQ%2BPHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPiZuYnNwOzwvdGQ%2BPC90cj4gPHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48dGQgd2lkdGg9JzQwJScgYWxpZ249J0NFTlRFUicgaGVpZ2h0PScxOSc%2B5LiA6Iez5LiJ5bm077yI5ZCr77yJPC90ZD48dGQgd2lkdGg9JzMwJScgYWxpZ249J2NlbnR' +
    //        'lcicgaGVpZ2h0PScxOSc%2BNi4zMDwvdGQ%2BPC90cj48dHIgc3R5bGU9J3dpZHRoOjEwMCUnPjx0ZCB3aWR0aD0nNDAlJyBhbGlnbj0nQ0VOVEVSJyBoZWlnaHQ9JzE5Jz7kuInoh7PkupTlubTvvIjlkKvvvIk8L3RkPjx0ZCB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz42LjQ4PC90ZD48L3RyPjx0ciBzdHlsZT0nd2lkdGg6MTAwJSc%2BPHRkIHdpZHRoPSc0MCUnIGFsaWduPSdDRU5URVInIGhlaWdodD0nMTknPuS6lOW5tOS7peS4ijwvdGQ%2BPHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPjYuODQ8L3RkPjwvdHI%' +
    //        '2BPHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48L3RyPjwvdGJvZHk%2BPC90YWJsZT5kZDLC5SgMP0LPJpGlSg2p4MvGj%2F%2FC',
    //        //_VIEWSTATE: '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NDAlJyBhbGlnbj0nQ0VOVEVSJyBoZWlnaHQ9JzE5Jz7lha3kuKrmnIjoh7PkuIDlubTvvIjlkKvvvIk8L3RkPjx0ZCB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz42LjEyPC90ZD48L3RyPjx0ciBzdHlsZT0nd2lkdGg6MTAwJSc+PHRkIHdpZHRoPSc0MCUnPjxkaXYgYWxpZ249J2xlZnQnPuOAgOS6jOOAgeS4remVv+acn+i0t+asvjwvZGl2PjwvdGQ+PHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPiZuYnNwOzwvdGQ+PC90cj4gPHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48dGQgd2lkdGg9JzQwJScgYWxpZ249J0NFTlRFUicgaGVpZ2h0PScxOSc+5LiA6Iez5LiJ5bm077yI5ZCr77yJPC90ZD48dGQgd2lkdGg9JzMwJScgYWxpZ249J2NlbnRlcicgaGVpZ2h0PScxOSc+Ni4zMDwvdGQ+PC90cj48dHIgc3R5bGU9J3dpZHRoOjEwMCUnPjx0ZCB3aWR0aD0nNDAlJyBhbGlnbj0nQ0VOVEVSJyBoZWlnaHQ9JzE5Jz7kuInoh7PkupTlubTvvIjlkKvvvIk8L3RkPjx0ZCB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz42LjQ4PC90ZD48L3RyPjx0ciBzdHlsZT0nd2lkdGg6MTAwJSc+PHRkIHdpZHRoPSc0MCUnIGFsaWduPSdDRU5URVInIGhlaWdodD0nMTknPuS6lOW5tOS7peS4ijwvdGQ+PHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPjYuODQ8L3RkPjwvdHI+PHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48L3RyPjwvdGJvZHk+PC90YWJsZT5kZDLC5SgMP0LPJpGlSg2p4MvGj//C',
    //        Sel_Date: '2012-06-08'
    //    }
    //
    //}, function(err, response, body){
    //        if(err) throw err;
    //        console.log(body);
    //    });


    request.post({
        url: 'http://www.icbc.com.cn/ICBCDynamicSite2/other/rmbcredit.aspx',
        form:{
            __EVENTTARGET: '',
            __EVENTARGUMENT:'',
            __LASTFOCUS: '',
            __VIEWSTATE: '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NDAlJyBhbGlnbj0nQ0VOVEVSJyBoZWlnaHQ9JzE5Jz7lha3kuKrmnIjoh7PkuIDlubTvvIjlkKvvvIk8L3RkPjx0ZCB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz40LjM1PC90ZD48L3RyPjx0ciBzdHlsZT0nd2lkdGg6MTAwJSc+PHRkIHdpZHRoPSc0MCUnPjxkaXYgYWxpZ249J2xlZnQnPuOAgOS6jOOAgeS4remVv+acn+i0t+asvjwvZGl2PjwvdGQ+PHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPiZuYnNwOzwvdGQ+PC90cj4gPHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48dGQgd2lkdGg9JzQwJScgYWxpZ249J0NFTlRFUicgaGVpZ2h0PScxOSc+5LiA6Iez5LiJ5bm077yI5ZCr77yJPC90ZD48dGQgd2lkdGg9JzMwJScgYWxpZ249J2NlbnRlcicgaGVpZ2h0PScxOSc+NC43NTwvdGQ+PC90cj48dHIgc3R5bGU9J3dpZHRoOjEwMCUnPjx0ZCB3aWR0aD0nNDAlJyBhbGlnbj0nQ0VOVEVSJyBoZWlnaHQ9JzE5Jz7kuInoh7PkupTlubTvvIjlkKvvvIk8L3RkPjx0ZCB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz40Ljc1PC90ZD48L3RyPjx0ciBzdHlsZT0nd2lkdGg6MTAwJSc+PHRkIHdpZHRoPSc0MCUnIGFsaWduPSdDRU5URVInIGhlaWdodD0nMTknPuS6lOW5tOS7peS4ijwvdGQ+PHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPjQuOTwvdGQ+PC90cj48dHIgc3R5bGU9J3dpZHRoOjEwMCUnPjwvdHI+PC90Ym9keT48L3RhYmxlPmRkOC7lcPqrcMp41LRLIyKlJC3A4f0=',
           // _VIEWSTATE: '%2FwEPDwUJNDkwNDM1MTYwD2QWAgIDD2QWAgIBD2QWBmYPEGQPFiRmAgECAgIDAgQCBQIGAgcCCAIJAgoCCwIMAg0CDgIPAhACEQISAhMCFAIVAhYCFwIYAhkCGgIbAhwCHQIeAh8CIAIhAiICIxYkEAUP6K%2B36YCJ5oup5pe26Ze0ZWcQBQoyMDE1LTEwLTI0BQoyMDE1LTEwLTI0ZxAFCjIwMTUtMDgtMjYFCjIwMTUtMDgtMjZnEAUKMjAxNS0wNi0yOAUKMjAxNS0wNi0yOGcQBQoyMDE1LTA1LTExBQoyMDE1LTA1LTExZxAFCjIwMTUtMDMtMDEFCjIwMTUtMDMtMDFnEAUKMjAxNC0xMS0yMgUKMjAxNC0xMS0yMmcQBQoyMDEyLTA3LTA2BQoyMDEyLTA3LTA2ZxAFCjIwMTItMDYtMDgFCjIwMTItMDYtMDhnEAUKMjAxMS0wNy0wNwUKMjAxMS0wNy0wN2cQBQoyMDExLTA0LTA2BQoyMDExLTA0LTA2ZxAFCjIwMTEtMDItMDkFCjIwMTEtMDItMDlnEAUKMjAxMC0xMi0yNgUKMjAxMC0xMi0yNmcQBQoyMDEwLTEwLTIwBQoyMDEwLTEwLTIwZxAFCjIwMDgtMTItMjMFCjIwMDgtMTItMjNnEAUKMjAwOC0xMS0yNwUKMjAwOC0xMS0yN2cQBQoyMDA4LTEwLTMwBQoyMDA4LTEwLTMwZxAFCjIwMDgtMTAtMDkFCjIwMDgtMTAtMDlnEAUKMjAwOC0wOS0xNgUKMjAwOC0wOS0xNmcQBQoyMDA3LTEyLTIxBQoyMDA3LTEyLTIxZxAFCjIwMDctMDktMTUFCjIwMDctMDktMTVnEAUKMjAwNy0wOC0yMgUKMjAwNy0wOC0yMmcQBQoyMDA3LTA3LTIxBQoyMDA3LTA3LTIxZxAFCjIwMDctMDUtMTkFCjIwMDctMDUtMTlnEAUKMjAwNy0wMy0xOAUKMjAwNy0wMy0xOGcQBQoyMDA2LTA4LTE5BQoyMDA2LTA4LTE5ZxAFCjIwMDYtMDQtMjgFCjIwMDYtMDQtMjhnEAUKMjAwNC0xMC0yOQUKMjAwNC0xMC0yOWcQBQoyMDAyLTAyLTIxBQoyMDAyLTAyLTIxZxAFCjE5OTktMDYtMTAFCjE5OTktMDYtMTBnEAUKMTk5OC0xMi0wNwUKMTk5OC0xMi0wN2cQBQoxOTk4LTA3LTAxBQoxOTk4LTA3LTAxZxAFCjE5OTgtMDMtMjUFCjE5OTgtMDMtMjVnEAUKMTk5Ny0xMC0yMwUKMTk5Ny0xMC0yM2cQBQoxOTk2LTA4LTIzBQoxOTk2LTA4LTIzZxAFCjE5OTYtMDUtMDEFCjE5OTYtMDUtMDFnFgFmZAIBDxYCHgRUZXh0BQoyMDA2LTA4LTE5ZAICDxYCHwAFxAs8dGFibGUgYm9yZGVyPScxJyBjZWxscGFkZGluZz0nMCcgY2VsbHNwYWNpbmc9JzAnIHdpZHRoPSc4NSUnICBydWxlcz0nYWxsJyBmcmFtZT0nYm9yZGVyJyBzdHlsZT0nYm9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlOyBib3JkZXItY29sb3I6ICNDQ0NDQ0M7Jz48dGJvZHk%2BPHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48dGQgd2lkdGg9JzU3JScgIGJnY29sb3I9JyNlOGU4ZTgnIFZBTElHTj0ndG9wJz7jgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDjgIDnp43nsbs8YnI%2BPGRpdiBhbGlnbj0nbGVmdCc%2BJm5ic3A76aG555uuPC9kaXY%2BPC90ZD48dGQgd2lkdGg9JzQzJScgYmdjb2xvcj0nI2U4ZThlOCcgaGVpZ2h0PSczMCcgYWxpZ249J2NlbnRlcic%2B5bm05Yip546HJTwvdGQ%2BPC90cj48dHIgc3R5bGU9J3dpZHRoOjEwMCUnPjx0ZCB3aWR0aD0nNDAlJz48ZGl2IGFsaWduPSdsZWZ0Jz7jgIDkuIDjgIHnn63mnJ%2FotLfmrL48L2Rpdj48L3RkPjx0ZCBoZWlnaHQ9JzE5JyB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJz4mbmJzcDs8L3RkPjwvdHI%2BPHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48dGQgd2lkdGg9JzQwJScgYWxpZ249J0NFTlRFUicgaGVpZ2h0PScxOSc%2B5YWt5Liq5pyI77yI5ZCr77yJPC90ZD48dGQgd2lkdGg9JzMwJScgYWxpZ249J2NlbnRlcicgaGVpZ2h0PScxOSc%2BNS41ODwvdGQ%2BPC90cj48dHIgc3R5bGU9J3dpZHRoOjEwMCUnPjx0ZCB3aWR0aD0nNDAlJyBhbGlnbj0nQ0VOVEVSJyBoZWlnaHQ9JzE5Jz7lha3kuKrmnIjoh7PkuIDlubTvvIjlkKvvvIk8L3RkPjx0ZCB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz42LjEyPC90ZD48L3RyPjx0ciBzdHlsZT0nd2lkdGg6MTAwJSc%2BPHRkIHdpZHRoPSc0MCUnPjxkaXYgYWxpZ249J2xlZnQnPuOAgOS6jOOAgeS4remVv%2Bacn%2Bi0t%2BasvjwvZGl2PjwvdGQ%2BPHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPiZuYnNwOzwvdGQ%2BPC90cj4gPHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48dGQgd2lkdGg9JzQwJScgYWxpZ249J0NFTlRFUicgaGVpZ2h0PScxOSc%2B5LiA6Iez5LiJ5bm077yI5ZCr77yJPC90ZD48dGQgd2lkdGg9JzMwJScgYWxpZ249J2NlbnRlcicgaGVpZ2h0PScxOSc%2BNi4zMDwvdGQ%2BPC90cj48dHIgc3R5bGU9J3dpZHRoOjEwMCUnPjx0ZCB3aWR0aD0nNDAlJyBhbGlnbj0nQ0VOVEVSJyBoZWlnaHQ9JzE5Jz7kuInoh7PkupTlubTvvIjlkKvvvIk8L3RkPjx0ZCB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz42LjQ4PC90ZD48L3RyPjx0ciBzdHlsZT0nd2lkdGg6MTAwJSc%2BPHRkIHdpZHRoPSc0MCUnIGFsaWduPSdDRU5URVInIGhlaWdodD0nMTknPuS6lOW5tOS7peS4ijwvdGQ%2BPHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPjYuODQ8L3RkPjwvdHI%2BPHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48L3RyPjwvdGJvZHk%2BPC90YWJsZT5kZDLC5SgMP0LPJpGlSg2p4MvGj%2F%2FC',
            //_VIEWSTATE: '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NDAlJyBhbGlnbj0nQ0VOVEVSJyBoZWlnaHQ9JzE5Jz7lha3kuKrmnIjoh7PkuIDlubTvvIjlkKvvvIk8L3RkPjx0ZCB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz42LjEyPC90ZD48L3RyPjx0ciBzdHlsZT0nd2lkdGg6MTAwJSc+PHRkIHdpZHRoPSc0MCUnPjxkaXYgYWxpZ249J2xlZnQnPuOAgOS6jOOAgeS4remVv+acn+i0t+asvjwvZGl2PjwvdGQ+PHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPiZuYnNwOzwvdGQ+PC90cj4gPHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48dGQgd2lkdGg9JzQwJScgYWxpZ249J0NFTlRFUicgaGVpZ2h0PScxOSc+5LiA6Iez5LiJ5bm077yI5ZCr77yJPC90ZD48dGQgd2lkdGg9JzMwJScgYWxpZ249J2NlbnRlcicgaGVpZ2h0PScxOSc+Ni4zMDwvdGQ+PC90cj48dHIgc3R5bGU9J3dpZHRoOjEwMCUnPjx0ZCB3aWR0aD0nNDAlJyBhbGlnbj0nQ0VOVEVSJyBoZWlnaHQ9JzE5Jz7kuInoh7PkupTlubTvvIjlkKvvvIk8L3RkPjx0ZCB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz42LjQ4PC90ZD48L3RyPjx0ciBzdHlsZT0nd2lkdGg6MTAwJSc+PHRkIHdpZHRoPSc0MCUnIGFsaWduPSdDRU5URVInIGhlaWdodD0nMTknPuS6lOW5tOS7peS4ijwvdGQ+PHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPjYuODQ8L3RkPjwvdHI+PHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48L3RyPjwvdGJvZHk+PC90YWJsZT5kZDLC5SgMP0LPJpGlSg2p4MvGj//C',
            Sel_Date: '2012-06-08'
            //_VIEWSTATE: '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MCUnIGFsaWduPSdDRU5URVInIGhlaWdodD0nMTknPuWFreS4quaciOiHs+S4gOW5tO+8iOWQq++8iTwvdGQ+PHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPjQuNjwvdGQ+PC90cj48dHIgc3R5bGU9J3dpZHRoOjEwMCUnPjx0ZCB3aWR0aD0nNDAlJz48ZGl2IGFsaWduPSdsZWZ0Jz7jgIDkuozjgIHkuK3plb/mnJ/otLfmrL48L2Rpdj48L3RkPjx0ZCB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz4mbmJzcDs8L3RkPjwvdHI+IDx0ciBzdHlsZT0nd2lkdGg6MTAwJSc+PHRkIHdpZHRoPSc0MCUnIGFsaWduPSdDRU5URVInIGhlaWdodD0nMTknPuS4gOiHs+S4ieW5tO+8iOWQq++8iTwvdGQ+PHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPjU8L3RkPjwvdHI+PHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48dGQgd2lkdGg9JzQwJScgYWxpZ249J0NFTlRFUicgaGVpZ2h0PScxOSc+5LiJ6Iez5LqU5bm077yI5ZCr77yJPC90ZD48dGQgd2lkdGg9JzMwJScgYWxpZ249J2NlbnRlcicgaGVpZ2h0PScxOSc+NTwvdGQ+PC90cj48dHIgc3R5bGU9J3dpZHRoOjEwMCUnPjx0ZCB3aWR0aD0nNDAlJyBhbGlnbj0nQ0VOVEVSJyBoZWlnaHQ9JzE5Jz7kupTlubTku6XkuIo8L3RkPjx0ZCB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz41LjE1PC90ZD48L3RyPjx0ciBzdHlsZT0nd2lkdGg6MTAwJSc+PC90cj48L3Rib2R5PjwvdGFibGU+ZGQUwQgjIBe11k74o1BIkTkKEV8KjA=='
            //__VIEWSTATE: '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NDAlJyBhbGlnbj0nQ0VOVEVSJyBoZWlnaHQ9JzE5Jz7lha3kuKrmnIjoh7PkuIDlubTvvIjlkKvvvIk8L3RkPjx0ZCB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz42LjEyPC90ZD48L3RyPjx0ciBzdHlsZT0nd2lkdGg6MTAwJSc+PHRkIHdpZHRoPSc0MCUnPjxkaXYgYWxpZ249J2xlZnQnPuOAgOS6jOOAgeS4remVv+acn+i0t+asvjwvZGl2PjwvdGQ+PHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPiZuYnNwOzwvdGQ+PC90cj4gPHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48dGQgd2lkdGg9JzQwJScgYWxpZ249J0NFTlRFUicgaGVpZ2h0PScxOSc+5LiA6Iez5LiJ5bm077yI5ZCr77yJPC90ZD48dGQgd2lkdGg9JzMwJScgYWxpZ249J2NlbnRlcicgaGVpZ2h0PScxOSc+Ni4zMDwvdGQ+PC90cj48dHIgc3R5bGU9J3dpZHRoOjEwMCUnPjx0ZCB3aWR0aD0nNDAlJyBhbGlnbj0nQ0VOVEVSJyBoZWlnaHQ9JzE5Jz7kuInoh7PkupTlubTvvIjlkKvvvIk8L3RkPjx0ZCB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz42LjQ4PC90ZD48L3RyPjx0ciBzdHlsZT0nd2lkdGg6MTAwJSc+PHRkIHdpZHRoPSc0MCUnIGFsaWduPSdDRU5URVInIGhlaWdodD0nMTknPuS6lOW5tOS7peS4ijwvdGQ+PHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPjYuODQ8L3RkPjwvdHI+PHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48L3RyPjwvdGJvZHk+PC90YWJsZT5kZDLC5SgMP0LPJpGlSg2p4MvGj//C'
        }
    }, function(err, response, body){
        if(err) throw err;
        console.log(body);
    });
   // console.log('2015-01-31' > '2015-01-01');
};
synchronize();
//synchronizePost();
// /var now = moment();
//console.log(now.toString());
//var format = moment(now).format('YYYY-MM-DD');
//console.log(format);
//var records = {};
//records['1992'] = '1992value';
//records['1993'] = '1003value';
//records['2015'] = '2015value';
//for(i in records){
//    console.log(i);
//}