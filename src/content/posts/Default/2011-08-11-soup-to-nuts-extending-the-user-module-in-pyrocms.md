---
title: Soup To Nuts Extending The User Module In Pyrocms
description: Soup to Nuts - The Complete Package
published: 2011-08-11
image: images/posts/2011-08-soup2nuts.webp
imageAlt: Soup to Nuts - The Complete Package
category: Default
tags: [coding, extend, modules, php, pyrocms]
---

![Soup to Nuts - The Complete Package](@assets/images/posts/2011-08-soup2nuts.jpg "Soup To Nuts Can")

I've been helping get a new site off the ground that uses the [PyroCMS](http://pyrocms.com) system. If you haven't heard of it, it is a CMS (content management system) that is built on top of the [CodeIgniter](http://codeigniter.com/) PHP framework. Having recently gone back into PHP and starting fresh with the [MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) approach to web development, I've been quite impressed with how easy I've been able to get things up and running.

That said, I ran into one hurdle with our new site. We needed students to register on the site and track some additional information about them. I did a little digging in the forums and online, and the general recommendation was not to override the user module built into the system, because future updates might overwrite your changes or cause some incompatibilities. The preferred solution is to create your own module to store your student related data, and tie into the user module as needed.

Since there is a lot of flexibility available with MVC, this approach was easy to implement. What makes things really nice is that we can use the existing user module built into the PyroCMS system, which allows us to simply strip out the duplicate references (no need to rewrite the user model) and work from there. I like this "learn from an existing" model approach to things, because you can see how the code is supposed to generally flow within the framework.

That said, I dug down to the public/system/pyrocms/modules/users folder and copied it to a separate location for me to work with. The first thing to do was to load up the details.php file in the root of the folder and modify the basic details. It also allows you to specify an install and uninstall method, which we can leverage to create the necessary tables we need:

public function install()

{

// Create student tables and add student category to user groups.

$sql = 'CREATE TABLE IF NOT EXISTS ' . $this->db->dbprefix('student') . '

(

id int NOT NULL AUTO_INCREMENT,

user_id int NOT NULL,

age int NOT NULL,

grade_level int NOT NULL,

gender char NOT NULL,

esl char NOT NULL,

sport_id int NOT NULL,

sport_level_id int NOT NULL,

created datetime NOT NULL,

modified datetime NOT NULL,

PRIMARY KEY (id)

)

';

$this->db->query($sql);

$sql = 'CREATE TABLE IF NOT EXISTS ' . $this->db->dbprefix('student_secondary_sport') . '

(

id int NOT NULL AUTO_INCREMENT,

student_id int NOT NULL,

sport_id int NOT NULL,

created datetime NOT NULL,

modified datetime NOT NULL,

PRIMARY KEY (id)

)

';

$this->db->query($sql);

$sql = 'INSERT INTO ' . $this->db->dbprefix('groups') . ' (name, description)

VALUES (\\'student\\', \\'Students\\')';

$this->db->query($sql);

return TRUE;

}

public function uninstall()

{

// Remove student related data and module settings

$sql = 'DELETE FROM '. $this->db->dbprefix('groups') . ' WHERE name = \\'student\\'';

$this->db->query($sql);

$sql = 'DROP TABLE '. $this->db->dbprefix('student_secondary_sport');

$this->db->query($sql);

$sql = 'DROP TABLE '. $this->db->dbprefix('student');

$this->db->query($sql);

$sql = 'DELETE FROM '. $this->db->dbprefix('modules') . ' WHERE name = \\'student\\'';

$this->db->query($sql);

return TRUE;

}

Since we can call the appropriate user models and helpers, there's no need to keep this code, so we remove a lot of files:

- config/ion_auth.php
- controllers/profile.php
- language/\* - leave the english folder, since you'll want to update a few of your tags. Keep other languages if you plan on translate
- libraries/\*
- models/profiles_m.php
- models/ion_auth_model.php
- flush most of your views, except for the register.php view and the admin, email, and settings subfolders

After removing the extra files, the next step is to go in and rename all of your user type files to student, or whatever you want to call them. You'll want to go through the remaining files and weed out the methods that aren't needed, such as login, since those are covered by the user model. After this, you need to inject the appropriate code into the appropriate methods. For instance, in the student controller, I need to retrieve all of the student related data from my view and insert that into the proper tables after a successful user insertion. The register method winds up looking like this:

/\*\*

\* Method to register a new student

\* @access public

\* @return void

\*/

public function register()

{

// Validation rules

\$validation = array(

array(

'field' => 'first_name',

'label' => 'lang:user_first_name_label',

'rules' => 'required|utf8'

),

array(

'field' => 'last_name',

'label' => 'lang:user_last_name_label',

'rules' => 'required|utf8'

),

array(

'field' => 'email',

'label' => 'lang:user_email_label',

'rules' => 'required|valid_email'

),

array(

'field' => 'password',

'label' => 'lang:user_password_label',

'rules' => 'min_length\[6]|max_length\[20]'

),

array(

'field' => 'confirm_password',

'label' => 'lang:user_password_confirm_label',

'rules' => 'matches\[password]'

),

array(

'field' => 'username',

'label' => 'lang:user_username',

'rules' => 'required|alphanumeric|min_length\[3]|max_length\[20]'

),

array(

'field' => 'display_name',

'label' => 'lang:user_display_name',

'rules' => 'alphanumeric|min_length\[3]|max_length\[50]'

),

array(

'field' => 'active',

'label' => 'lang:user_active_label',

'rules' => ''

),

array(

'field' => 'age',

'label' => 'lang:student_age',

'rules' => 'required|integer'

),

array(

'field' => 'grade_level',

'label' => 'lang:student_grade_level',

'rules' => 'required|integer'

),

array(

'field' => 'gender',

'label' => 'lang:student_gender',

'rules' => 'required|alpha'

),

array(

'field' => 'esl',

'label' => 'lang:student_esl',

'rules' => 'required|alpha'

),

array(

'field' => 'sport_id',

'label' => 'lang:student_sport',

'rules' => 'required|numeric'

)

);

// Set the validation rules

$this->form_validation->set_rules($validation);

$email = $this->input->post('email');

$password = $this->input->post('password');

$username = $this->input->post('username');

$group_id = (int)$this->input->post('group_id');

$age = (int)$this->input->post('age');

$grade_level = (int)$this->input->post('grade_level');

$gender = $this->input->post('gender');

$esl = $this->input->post('esl');

$sport_id = (int)$this->input->post('sport_id');

$sport_level_id = (int)$this->input->post('sport_level_id');

\$secondary_sport_ids = array();

\$sports = get_sports();

$sportids = array_keys($sports);

foreach ($sportids as $id)

{

$secondaryid = 'secondary_sport\_' . $id;

if($this->input->post($secondaryid))

{

$secondary_sport_ids\[] = $id;

}

}

\$user_data_array = array(

'first_name' => \$this->input->post('first_name'),

'last_name' => \$this->input->post('last_name'),

'display_name' => \$this->input->post('display_name'),

'group_id' => (int)\$this->input->post('group_id'),

'age' => (int)\$this->input->post('age'),

'grade_level' => (int)\$this->input->post('grade_level'),

'gender' => \$this->input->post('gender'),

'esl' => \$this->input->post('esl'),

'sport_id' => (int)\$this->input->post('sport_id'),

'sport_level_id' => (int)\$this->input->post('sport_level_id'),

'secondary_sport_ids' => \$secondary_sport_ids

);

// Convert the array to an object

\$user_data = new stdClass();

$user_data->first_name = $user_data_array\['first_name'];

$user_data->last_name = $user_data_array\['last_name'];

$user_data->display_name = $user_data_array\['display_name'];

$user_data->username = $username;

$user_data->email = $email;

$user_data->password = $password;

$user_data->confirm_email = $this->input->post('confirm_email');

$user_data->group_id = (int)$this->input->post('group_id');

$user_data->age = (int)$this->input->post('age');

$user_data->grade_level = (int)$this->input->post('grade_level');

$user_data->gender = $this->input->post('gender');

$user_data->esl = $this->input->post('esl');

$user_data->sport_id = (int)$this->input->post('sport_id');

$user_data->sport_level_id = (int)$this->input->post('sport_level_id');

$user_data->secondary_sport_ids = $secondary_sport_ids;

if (\$this->form_validation->run())

{

$group = $this->group_m->get(\$this->input->post('group_id'));

// Try to create the user

if ($id = $this->ion_auth->register($username, $password, $email, $user_data_array, \$group->name))

{

// Insert the student information to the proper table and add it to the user data object.

\$sql = 'INSERT INTO student (user_id, age, grade_level, gender, esl, sport_id, sport_level_id, created, modified)

VALUES (' . $this->db->escape($id) . ', '

. $this->db->escape($age) . ', '

. $this->db->escape($grade_level) . ', '

. $this->db->escape($gender) . ', '

. $this->db->escape($esl) . ', '

. $this->db->escape($sport_id) . ', '

. $this->db->escape($sport_level_id) . ',

NOW(),

NOW()

)';

$this->db->query($sql);

$student_id = $this->db->insert_id();

$user_data->student_id = $student_id;

// Insert any secondary sports for the student.

if (isset($secondary_sport_ids) && count($secondary_sport_ids > 0))

{

foreach ($secondary_sport_ids as $sportid)

{

\$sql = 'INSERT INTO student_secondary_sport (student_id, sport_id, created, modified)

VALUES (' . $this->db->escape($student_id) . ', '

. $this->db->escape($sportid) . ',

NOW(),

NOW()

)';

$this->db->query($sql);

}

}

$this->session->set_flashdata(array('notice' => $this->ion_auth->messages()));

redirect('/users/activate');

}

// Can't create the user, show why

else

{

$this->data->error_string = $this->ion_auth->errors();

}

}

else

{

// Return the validation error

$this->data->error_string = $this->form_validation->error_string();

}

$this->data->user_data =& $user_data;

\$this->template->title(lang('student_register_title'));

$this->template->build('register', $this->data);

}

Obviously there's a lot more to process, but it's a lot simpler than it looks. It's just tricky to piece things together, at least if you're not too familiar with CodeIgniter, PyroCMS, or MVC in general. However, I made it through it and you can too!

Once you get your module code complete, you can copy it into your addons/modules folder and then login to your site. In your Add-Ons section you should see where you can install the module, which will create your tables and get you going. PyroCMS makes it really nice this way to plug new stuff in to your site. Students can register using the proper path of /students/register, and standard users can still register using the path of /register or /users/register. In addition, with the latest 1.3 release of PyroCMS, there is an event model that has been updated. With the new event model, you could detect a user login, and then do some additional processing, such as grab the student information and add it to the \$this->user object that is available in the system.

The next step for this, is to be able to abstract the module more, so that you could create custom fields for as many groups as you need. Then you could share these properties across multiple groups. For instance, you may have a property called "School" that would be needed by teachers and students, but only the "primary sport" property would be needed by the students.

I've gone ahead and attached the module code I've written, in hopes of helping you get off the ground with extending the user model in PyroCMS to meet your own needs. This code is functional on our site, but I'm sure there's always a few tweaks or updates that would make things nicer. Please feel free to drop me a line if you see any of those.

Enjoy!

[Donwload](https://github.com/Dillie-O/PyroCMS-Student-Module) the module from the git repository.