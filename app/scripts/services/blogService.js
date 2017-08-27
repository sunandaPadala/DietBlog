'use strict';
var app = angular.module('dietBlog');
app.service('blogService', ['$q', '$http', function($q, $http) {
  this.loadImages = function() {
    $http.get('https://right-my-diet.herokuapp.com/all/articles?limit=10&skip=10').then(function(response) {
      console.log(response);
    }, function(err) {
      console.log(err);
    });
    var awesomeThings = [{
        'imgPath': '../images/8.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "<p style=\"\">Hair fall is caused due to many factors. They include:</p><p style=\"\"><strong>1. Stress</strong></p><p>Stress is a common problem these days faced by almost everyone. It can lead to several health problems ranging from a minor illness to life-threatening medical conditions. Studies have indicated that high level of stress is responsible for causing hair fall in most people.</p><p><br></p><p style=\"\"><strong>2. Hereditary Causes</strong></p><p>Hair fall that happens due to genetic reasons is also known as androgenetic alopecia. According to the American Academy of Dermatology, it is the most common cause of hair fall. This gene can be inherited from either of your parents&rsquo; side of the family. You are more likely to suffer from hair fall if both your parents have suffered from it too.</p><p><br></p><p style=\"\"><strong>3. Hormonal Imbalance</strong></p><p>Hormonal imbalances caused due to menopause, pregnancy, and malfunctioning thyroid glands are also responsible for causing hair fall.</p><p><br></p><p style=\"\"><strong>4. Unhealthy Food</strong></p><p>Junk food is considered harmful because it hardly provides your body any nutrients and makes it vulnerable to health conditions. Eating junk food can lead to nutritional deficiencies which can cause hair fall and baldness. People with eating disorders are also likely to suffer from excessive hair loss.</p><p><br></p><p style=\"\"><strong>5. Harsh Chemical Treatments</strong></p><p>Harsh chemical treatments offered by salons, such as straightening and curling, can weaken your hair follicles when frequently done. This contributes to more hair fall. Blow drying your hair on a regular basis also contributes a lot to hair fall.</p><p><br></p><p style=\"\"><strong>6. Psoriasis</strong></p><p>Dandruff is a common problem these days which can be easily treated. But if neglected, it can start turning into thick scaly patches, known as psoriasis. This long term skin problem is caused when the skin cells grow rapidly, leading to thick, white, silvery or red patches of skin.</p><p><br></p><p style=\"\"><strong>7. Protein Deficiency</strong></p><p>Our hair is made up of a protein called keratin. Deficiency of this protein in your diet can weaken your hair. This results in dry and brittle hair that breaks easily. This can also be a symptom of thyroid related issues, so consult your doctor.</p><p><br></p><p style=\"\"><strong>8. Iron Deficiency or Anemia</strong></p><p>Anemia is a common problem observed in women who do not have enough iron rich food. It is caused when the blood does not have enough red blood cells. These cells transport oxygen throughout your body, providing you the energy that you need. Anemia is a major cause of hair loss as hair follicles also require an adequate supply of blood for their growth and maintenance.</p><p>Some other causes of hair fall are aging. Deficiency of vitamin B6 and folic acid, over styling, and thyroid diseases.</p><p style=\"\"><br></p><p style=\"\"><br></p>"
      },
      {
        'imgPath': '../images/1.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      },
      {
        'imgPath': '../images/2.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      },
      {
        'imgPath': '../images/3.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      },
      {
        'imgPath': '../images/4.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      }, {
        'imgPath': '../images/5.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      }, {
        'imgPath': '../images/16.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      }, {
        'imgPath': '../images/7.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      }, {
        'imgPath': '../images/8.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      }
    ];

    return awesomeThings;
  };

}]);
