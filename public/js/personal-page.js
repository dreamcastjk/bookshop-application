"use strict";

(function () {

    $('document').ready(function () {

        //кнопка "Сменить аватар"
        $('#changeAvatarButton').click( function() {

            console.log('Change Avatar');

            $('#hiddenAvatarBlock').show();

        });//#changeAvatarButton

        //сохранить новую фотографию
        $('#saveNewAvatar').click( async function () {

            console.log('Save Avatar');

            //получаем файл
            let avatarFile = $('#avatarFile').prop('files');

            //проверяем наличие файла
            if(avatarFile.length !== 0){

                let newAvatarFile = avatarFile[0];

                //берём расширениеи полученного файла
                let extsn = newAvatarFile.name.substring(newAvatarFile.name.lastIndexOf('.'));

                //допустимые расширения для загрузки
                const extensions = [
                    '.jpg',
                    '.jpeg',
                    '.png',
                    '.bmp',
                ];

                //проверяем расширение файла на допустимое
                if( extensions.indexOf( extsn ) ){

                    $('#errorInput').text('Тип файла некорректен').fadeIn(500).delay( 5000 ).fadeOut( 500 );
                    return;

                }//if

                let avatarData = new FormData();
                avatarData.append('avatarFile', newAvatarFile);

                try{

                    let url = `${window.paths.AjaxServerUrl}${window.paths.SaveNewAvatar}`;

                    let newAvatarResponse = await $.ajax({

                        url: url,
                        method: 'POST',
                        contentType: false,
                        processData: false,
                        data: avatarData

                    });

                    if( +newAvatarResponse.code === 200 ){

                        $('#successMessage').fadeIn(200).delay(5000).fadeOut(1500);

                    }//if
                    else{

                        $('#errorMessage').fadeIn(500).delay( 5000 ).fadeOut( 500 );

                    }//else

                }//try
                catch(ex){

                    $('#errorMessage').fadeIn(500).delay( 5000 ).fadeOut( 500 );

                    console.log(ex);

                }//catch

            }//if

            $('#hiddenAvatarBlock').hide();

        });//#savePhoto

        //подтверждение изменений личной информации
        $('#ConfirmChangesModalButton').click(function () {

            //получаем новые значения персональных данных
            let newLogin = $('#newLoginInput').val();
            let newEmail = $('#newEmailInput').val();

            //Проводим проверку полей на пустое значение
            if(newLogin.length === 0){

                $('#exampleModalCenter').modal('hide');
                $('#errorMessage').text('Поле Логина не должно быть пустым.').fadeIn(500).delay( 5000 ).fadeOut( 500 );

                return;

            }//if

            if(newEmail.length === 0){

                $('#exampleModalCenter').modal('hide');
                $('#errorMessage').text('Поле Email не должно быть пустым.').fadeIn(500).delay( 5000 ).fadeOut( 500 );

                return;

            }//if

            //проводим проверку на правильность воода новых персональных данных
            //if(!window.ValidatorConst.USER_LOGIN_VALIDATOR.test(newLogin)){
            if(!/^[a-z\d]{4,16}$/i.test(newLogin)){

                $('#exampleModalCenter').modal('hide');
                $('#errorMessage').text('Поле Логина содержит не корректные символы!').fadeIn(500).delay( 5000 ).fadeOut( 500 );

                return;

            }//if

           // if(!window.ValidatorConst.USER_EMAIL_VALIDATOR.test(newEmail)){
            if(!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i.test(newEmail)){

                $('#exampleModalCenter').modal('hide');
                $('#errorMessage').text('Поле Email содержит не корректные символы!').fadeIn(500).delay( 5000 ).fadeOut( 500 );

                return;

            }//if

            let url = `${window.paths.AjaxServerUrl}${window.paths.SaveNewPersonalData}`;

            $.ajax({

               'url': url,
                'method': 'PUT',
                'data':{
                   newLogin: newLogin,
                   newEmail: newEmail
                },
                'success': (data)=>{

                   if(+data.code === 200){
                       $('#successMessage').text('Данные успешно обновлены!').fadeIn(500).delay( 5000 ).fadeOut( 500 );
                   }//if

                },//success
                'statusCode':{
                   '301': ()=>{

                       $('#errorInput')
                           .text("Пользователь с такими данными уже есть.")
                           .fadeIn(750)
                           .delay(2500)
                           .fadeOut(750);

                   },
                   '500': ()=>{

                       $('#errorInput')
                           .text("Ошибка загрузки данных")
                           .fadeIn(750)
                           .delay(2500)
                           .fadeOut(750);

                   }

                }//statusCode

            });

        });//ConfirmChangesModalButton

        //изменение пароля пользователя
        $('#ConfirmPasswordChangesModalButton').click(function () {

            let oldPassword = $('#oldPasswordInput').val();
            let newPassword = $('#newPasswordInput').val();
            let confirmNewPassword = $('#confirmNewPassword').val();

            if(!/^[a-z_?!^%()\d]{6,30}$/i.test(oldPassword)){

                $('#errorMessage').text('Старый пароль содержит не корректные симовлы').fadeIn(500).delay( 5000 ).fadeOut( 500 );
                $('#exampleModalCenter').modal('hide');

                return;

            }//if

            if(!/^[a-z_?!^%()\d]{6,30}$/i.test(newPassword)){

                $('#errorMessage').text('Новый пароль содержит не корректные симовлы').fadeIn(500).delay( 5000 ).fadeOut( 500 );
                $('#exampleModalCenter').modal('hide');

                return;

            }//if

            if(!/^[a-z_?!^%()\d]{6,30}$/i.test(confirmNewPassword)){

                $('#errorMessage').text('Старый пароль содержит не корректные символы').fadeIn(500).delay( 5000 ).fadeOut( 500 );
                $('#exampleModalCenter').modal('hide');

                return;

            }//if

            if(newPassword !== confirmNewPassword){

                $('#errorMessage').text('Новый пароль не совпадает!').fadeIn(500).delay( 5000 ).fadeOut( 500 );
                $('#exampleModalCenter').modal('hide');

                return;

            }//if

        });//changePassword

    });//document.ready

})();



