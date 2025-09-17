let errorBox = document.getElementsByClassName("error-box")
let successBox = document.getElementsByClassName("success-box")
let publishBlogBtn = document.getElementById("publishBlogBtn")


document.addEventListener("DOMContentLoaded", () => {
    fetch("/me/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(async (res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        if (!data.success) {
            console.error("Server error:", data.message || "Unknown error");
        } else if (data.success) {
            if (data.user) {
                
            }
        }
    })
    .catch((err) => {
        console.error("Network error:", err);
        alert("Network error. Please try again.");
    });
});

// Global variables
let editor;

// Initialize CKEditor after page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof ClassicEditor !== 'undefined') {
        ClassicEditor
            .create(document.querySelector('#editor'))
            .then(newEditor => {
                editor = newEditor;
                console.log('Editor initialized successfully');
                
                // Update preview when content changes
                editor.model.document.on('change:data', () => {
                    document.getElementById('previewContent').innerHTML = editor.getData();
                });
            })
            .catch(error => {
                console.error('Error initializing editor:', error);
                document.getElementById('errorAlert').style.display = 'block';
                document.getElementById('errorAlert').textContent = 'Error loading text editor';
            });
    } else {
        console.error('ClassicEditor is not defined. Check CDN link.');
        document.getElementById('errorAlert').style.display = 'block';
        document.getElementById('errorAlert').textContent = 'Text editor failed to load';
    }
});

// Form submission
document.getElementById('createBlogForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    publishBlogBtn.disabled = true;
    publishBlogBtn.innerHTML = 'Publishing...';
    const title = document.getElementById('title').value;
    const content = editor ? editor.getData() : '';
    const slug = document.getElementById("slug").value
    const status = document.getElementById("status").value
    const tags = document.getElementById("tags").value
    const metaTitle = document.getElementById("metaTitle").value
    const metaDescription = document.getElementById("metaDescription").value
    // Validation
    if (!title.trim()) {
        successBox[0].style.display = "none"
        setTimeout(() => {
            errorBox[0].style.display = "block"
            errorBox[0].innerHTML = "Please enter a valid title."
            return;
        }, 2000);
    }
    
    if (!content.trim() || content === '<p>&nbsp;</p>') {
        successBox[0].style.display = "none"
        setTimeout(() => {
            errorBox[0].style.display = "block"
            errorBox[0].innerHTML = "Post content can not be empty"
            return;
        }, 2000);
    }
    
    try {
        const response = await fetch('/blog/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
                slug,
                status,
                tags,
                metaTitle,
                metaDescription
            })
        });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.errors || 'Error publishing post');
        }
        
        if (data.success) {
            setTimeout(() => {
                successBox[0].style.display = "block"
                errorBox[0].style.display = "none"
                successBox[0].innerHTML = data.message || "Blog creation success."
            }, 3000);
            // Reset form
            // document.getElementById('createBlogForm').reset();
            if (editor) editor.setData('');
            document.getElementById('previewContent').innerHTML = '<p>After writing your content, the preview will appear here...</p>';
        } else {
            errorBox[0].style.display = "block"
            successBox[0].style.display = "none"
            if (data.validationError) {
                errorBox[0].innerHTML = data.errors || "Blog creation failure."
            } 
            errorBox[0].innerHTML = data.message || "Blog creation failure."
        }
    } catch (error) {
        setTimeout(() => {
            successBox[0].style.display = "none"
            errorBox[0].style.display = "block"
            errorBox[0].innerHTML = error || "Blog creation failure."
        }, 3000);
    } finally {
        // Re-enable button after 3 seconds
        setTimeout(() => {
            publishBlogBtn.disabled = false;
            publishBlogBtn.innerHTML = 'Publish Post';
        }, 3000);
    }
});

