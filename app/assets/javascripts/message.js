$(function(){
  function buildHTML(message){
          if (message.image && message.content) {
            var html =
            `<div class="messages__message" data-id="${message.id}">
                <div class="messages__message__info">
                  <div class="messages__message__info__user-name">
                    ${message.user_name}
                  </div>
                  <div class="messages__message__info__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="messages__message__text">
                  <p class="messages__message__text__content">
                    ${message.content}
                  </p>
                </div>
                <img src="${message.image}" >
              </div>`
            return html;
          } else {
            var html =
            `<div class="messages__message" data-id="${message.id}">
                 <div class="messages__message__info">
                  <div class="messages__message__info__user-name">
                    ${message.user_name}
                  </div>
                  <div class="messages__message__info__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="messages__message__text">
                  <p class="messages__message__text__content">
                    ${message.content}
                  </p>
                </div>
              </div>`
            return html;
          };
        }

  var reloadMessages = function() {
    last_message_id = $(".messages__message:last").data("id");
    console.log(last_message_id)

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $("#new_message")[0].reset();
      $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
  

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      console.log(html)  
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.new_message__inputbox__send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
    }  
});
