**API Endpoint Documentation**

---
 🔐---> this refer that it is you need to login first


1. **alumni_register**
   - **Path**: `controller/reg_alumni.php`
   - **Method**: POST
   - **Params**:
     - name
     - email
     - password
     - job
     - department
     - img (Multipart Form)
   - **Multipart**: Yes

2. **submit_feedback_alumni**   🔐
   - **Path**: `controller/submit_feedback_alumni.php`
   - **Method**: POST
   - **Params**:
     - content
   - **Multipart**: No

3. **response_feedback_admin**  🔐
   - **Path**: `controller/response_feedback_admin.php`
   - **Method**: POST
   - **Params**:
     - feedback_id
     - response
   - **Multipart**: No

4. **reg_student**
   - **Path**: `controller/reg_student.php`
   - **Method**: POST
   - **Params**:
     - name
     - email
     - password
     - image (Multipart Form)
   - **Multipart**: Yes

5. **reg_admin**
   - **Path**: `controller/Reg_Admin.php`
   - **Method**: POST
   - **Params**:
     - name
     - email
     - password
     - img
   - **Multipart**: Yes

6. **offer_mentorship_alumni**
   - **Path**: `controller/offer_mentorship_alumni.php`
   - **Method**: POST
   - **Params**:
     - field
     - description
   - **Multipart**: No

7. **login_student**
   - **Path**: `controller/login_student.php`
   - **Method**: POST
   - **Params**:
     - email
     - password
   - **Multipart**: No

8. **login_alumni**
   - **Path**: `controller/login_alumni.php`
   - **Method**: POST
   - **Params**:
     - email
     - password
   - **Multipart**: No

9. **login_admin**
   - **Path**: `controller/Login_Admin.php`
   - **Method**: POST
   - **Params**:
     - email
     - password
   - **Multipart**: No

10. **join_group_alumni**  🔐
    - **Path**: `controller/join_group_alumni.php`
    - **Method**: POST
    - **Params**:
      - id_group
    - **Multipart**: No

11. **get_comment_post**
    - **Path**: `controller/get_comment_post.php`
    - **Method**: GET
    - **Params**:
      - post_id
    - **Multipart**: No

12. **get_all_story_alumni**
    - **Path**: `controller/get_all_story_alumni.php`
    - **Method**: GET
    - **Params**:
       - alumni_id
    - **Multipart**: No

13. **get_all_post_goups**
    - **Path**: `controller/get_all_post_goups.php`
    - **Method**: GET
    - **Params**:
      - group_id
    - **Multipart**: No

14. **get_all_news**
    - **Path**: `controller/get_all_news.php`
    - **Method**: GET
    - **Params**: None
    - **Multipart**: No

15. **get_all_mentorship**
    - **Path**: `controller/get_all_mentorship.php`
    - **Method**: GET
    - **Params**: None
    - **Multipart**: No

16. **get_all_event**
    - **Path**: `controller/get_all_event.php`
    - **Method**: GET
    - **Params**: None
    - **Multipart**: No

17. **exit_group_alumni** 🔐
    - **Path**: `controller/exit_group_alumni.php`
    - **Method**: POST
    - **Params**:
      - alumni_id
      - group_id
    - **Multipart**: No

18. **delete_story_alumni** 🔐
    - **Path**: `controller/delete_story_alumni.php`
    - **Method**: POST
    - **Params**:
      - story_id
    - **Multipart**: No

19. **delete_news_admin** 🔐
    - **Path**: `controller/delete_news_admin.php`
    - **Method**: POST
    - **Params**:
      - id_news
    - **Multipart**: No

20. **delete_comment_alumni** 🔐
    - **Path**: `controller/delete_comment_alumni.php`
    - **Method**: POST
    - **Params**:
      - comment_id
    - **Multipart**: No

21. **create_story_alumni** 🔐
    - **Path**: `controller/create_story_alumni.php`
    - **Method**: POST
    - **Params**:
      - title
      - content
    - **Multipart**: no

22. **create_post_alumni** 🔐
    - **Path**: `controller/create_post_alumni.php`
    - **Method**: POST
    - **Params**:
      - group_id
      - content
      - img (Multipart Form)
    - **Multipart**: Yes

23. **create_news_admin** 🔐
    - **Path**: `controller/create_news_admin.php`
    - **Method**: POST
    - **Params**:
      - title_news
      - content_news
    - **Multipart**: no

24. **create_group_alumni**  🔐
    - **Path**: `controller/create_group_alumni.php`
    - **Method**: POST
    - **Params**:
      - name
      - type
    - **Multipart**: No

25. **create_event_admin** 🔐
    - **Path**: `controller/create_Event_Admin.php`
    - **Method**: POST
    - **Params**:
      - event_name
      - event_location
      - event_date // Ensure this is in a valid date format (YYYY-MM-DD)
    - **Multipart**: no

26. **create_comment_alumni**🔐
    - **Path**: `controller/create_comment_alumni.php`
    - **Method**: POST
    - **Params**:
      - post_id
      - content
    - **Multipart**: No

28. **apply_mentorship_student**🔐
    - **Path**: `controller/apply_mentorship_student.php`
    - **Method**: POST
    - **Params**:
      - mentorship_id
    - **Multipart**: No

29. **alumni_register_event**🔐
    - **Path**: `controller/alumni_register_event.php`
    - **Method**: POST
    - **Params**:
      - event_id
    - **Multipart**: No

30. **get_all_groups**
    - **Path**: `controller/get_all_groups.php`
    - **Method**: GET
    - **Params**: None
    - **Multipart**: No

31. **get_student_id**
    - **Path**: `controller/get_student_by_id.php`
    - **Method**: GET
    - **Params**:
      - student_id
    - **Multipart**: No

32. **get_alumni_id**
    - **Path**: `controller/get_alumni_by_id.php`
    - **Method**: GET
    - **Params**:
      - alumni_id
    - **Multipart**: No

33. **update_alumni**🔐
    - **Path**: `controller/update_data_alumni.php`
    - **Method**: PUT / POST
    - **Params**:
      - name
      - email
      - password
      - job
    - **Multipart**: No

34. **get_all_alumni_name**
    - **Path**: `controller/get_all_alumni.php`
    - **Method**: GET
    - **Params**:
       -name
    - **Multipart**: No

35. *logout*
    - **Method**: GET
    - **Params**: none
    - **Multipart**: No

36. **get_event_alumni**
    - **Method**: GET
    - **Params**: none
    - **Multipart**: No

37. **get_all_feedback**
    - **Method**: GET
    - **Params**: none
    - **Multipart**: No
