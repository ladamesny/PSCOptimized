var MYAPP ={


    currencyFormat: function (amount) {
      var i = parseFloat(amount);
      if(isNaN(i)) { i = 0.00; }
      var minus = '';
      if(i < 0) { minus = '-'; }
      i = Math.abs(i);
      i = parseInt((i + .005) * 100);
      i = i / 100;
      s = new String(i);
      if(s.indexOf('.') < 0) { s += '.00'; }
      if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
      s = minus + s;
      return s;
      },

    commaFormat: function (amount) {
      var delimiter = ","; // replace comma if desired
      var a = amount.split('.',2);
      var d = a[1];
      var i = parseInt(a[0]);
      if(isNaN(i)) { return ''; }
      var minus = '';
      if(i < 0) { minus = '-'; }
      i = Math.abs(i);
      var n = new String(i);
      var a = [];
      while(n.length > 3) {
        var nn = n.substr(n.length-3);
        a.unshift(nn);
        n = n.substr(0,n.length-3);
      }
      if(n.length > 0) { a.unshift(n); }
      n = a.join(delimiter);
      if(d.length < 1) { amount = n; }
      else { amount = n + '.' + d; }
      amount = minus + amount;
      return amount;
    },

    percentFormat: function (percent){
      return (percent * 100).toFixed(1);
    },

    convertPercent: function(num){
              return num / 100;
    },

 
    calcSummary: function()
      {
        $(".alert").fadeOut();
        $(".form-group").removeClass("has-error");
        $("span").remove("#inputFields");
        var accountValue = $("#account-value").val();
        var accountRiskRatio = $("#account-risk-ratio").val();
        var copyAccountRiskRatio = this.convertPercent(accountRiskRatio);
        var entryPrice = $("#entry-price").val();
        var initialProtectiveStop = $("#initial-protective-stop").val();
        var errorAlerted = false;
        var inputTags = {"#account-value": accountValue,  "#account-risk-ratio": accountRiskRatio, "#entry-price": entryPrice,  "#initial-protective-stop": initialProtectiveStop};
        for (var x in inputTags) {
          if ( isNaN(inputTags[x]) || inputTags[x] == 0){
            // highlights each input field that has an error in it.
            errorAlerted = true; 
            $(x).closest(".form-group").addClass("has-error");
            $(x).closest(".input-group").append('<span class="glyphicon glyphicon-remove form-control-feedback" id="inputFields" aria-hidden="true"></span>');
          }
        }

        // if error was thrown, we show the error banner.
        if (errorAlerted){
          $(".alert").fadeIn();
        } else{
          $("#account-value").val(this.currencyFormat(accountValue));
          $("#account-risk-ratio").val((copyAccountRiskRatio*100));
          $("#entry-price").val(this.currencyFormat(entryPrice));
          $("#initial-protective-stop").val(this.currencyFormat(initialProtectiveStop));
           
          for(var i in inputTags){
            $(i).css("text-align", "right");
          }


          var riskedShare = entryPrice - initialProtectiveStop;
          var riskedPosition = riskedShare/entryPrice;
          var maxAcceptableRisk = ((accountValue*copyAccountRiskRatio)/riskedShare).toFixed(1);
          var riskedPositionDoll = maxAcceptableRisk * riskedShare;
          var positionSize = maxAcceptableRisk * entryPrice

          $("#risked-share").html("$"+this.commaFormat(this.currencyFormat(riskedShare)));
          $("#pos-size").html("$"+this.commaFormat(this.currencyFormat(positionSize)));
          $("#risked-position-per").html(this.commaFormat(this.percentFormat(riskedPosition))+"%");
          $("#max-risk").html(maxAcceptableRisk+ " shares");
          $("#risked-position-dol").html("$"+this.commaFormat(this.currencyFormat(riskedPositionDoll)));
        }
      }
    };
