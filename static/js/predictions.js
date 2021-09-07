var reduced_column_names = []
fetch('/api/feature_names')
  .then(response => response.json())
  .then(feature_names => {
    console.log(feature_names);
    var user_input_html = ''
    feature_names.forEach(feature_name => {
      reduced_column_names.push(feature_name)
      user_input_html += `
        <input id = '${feature_name}' placeholder = '${feature_name}' style = 'width: 400px; text-align:center; margin-bottom:2px;'></input>
        <br>
        `
    });
    $('#user-inputs').html(user_input_html)
  });


function submit_button_pressed() {

  var typed_inputs = {}
  reduced_column_names.forEach(reduced_column_name => {
    var user_input = d3.select(`#${reduced_column_name}`).property('value')
    typed_inputs[reduced_column_name] = user_input
  })
  

  fetch('/api/generate_prediction', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(typed_inputs),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data[0]);
      
      var prediction_message;
      if(data[0]=='1'){
        prediction_message='Go to Court'
      }
      else{
        prediction_message='Go Home'
      }
      var prediction_div = d3.select(`#prediction-text`)
      prediction_div.text(prediction_message)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
