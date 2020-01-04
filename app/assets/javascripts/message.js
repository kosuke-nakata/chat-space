$(function(){
  
  console.log(last_message_id);

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
    })
    .fail(function() {
      console.log('error');
    });
  };
});

      var buildHTML = function(message) {
        if (message.content && message.image) {

        var html = `<div class="messages__message" data-message-id=` + message.id + `>` +
          `<div class="messages__message__info">` +
             `<div class="messages__message__info__user-name">` +
              message.user_name +
              `</div>` +
              `<div class="messages__message__info__date">` +
                message.created_at +
              `</div>` +
            `</div>` +
            `<div class="messages__message__text">` +
              `<p class="messages__message__text__content">` +
                message.content +
              `</p>` +
            `<img src="` + message.image + `" class="messages__message__text__image" >` +
          `</div>` +
          `</div>`
        } else if (message.content) {
        var html = `<div class="messages__message" data-message-id=` + message.id + `>` +
            `<div class="messages__message__info">` +
              `<div class="messages__message__info__user-name">` +
                message.user_name +
              `</div>` +
              `<div class="messages__message__info__date">` +
                message.created_at +
              `</div>` +
            `</div>` +
            `<div class="messages__message__text">` +
              `<p class="messages__message__text__content">` +
                message.content +
              `</p>` +
            `</div>` +
          `</div>`
        } else if (message.image) {
          var html = `<div class="messages__message" data-message-id=` + message.id + `>` +
          `<div class="messages__message__info">` +
            `<div class="messages__message__info__user-name">` +
              message.user_name +
            `</div>` +
            `<div class="messages__message__info__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="messages__message__text">` +
            `<img src="` + message.image + `" class="messages__message__text__image" >` +
          `</div>` +
        `</div>`
      };
      return html;
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
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.new_message__inputbox__send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
})
