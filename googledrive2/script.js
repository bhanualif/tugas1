const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");

function uploadFile() {
  const file = fileInput.files[0];
  if (!file) return alert("Silakan pilih file.");

  const files = JSON.parse(localStorage.getItem("driveFiles") || "[]");
  files.push({
    name: file.name,
    size: file.size,
    uploadedAt: new Date().toISOString()
  });

  localStorage.setItem("driveFiles", JSON.stringify(files));
  renderFileList();
}

function deleteFile(index) {
  const files = JSON.parse(localStorage.getItem("driveFiles") || "[]");
  files.splice(index, 1);
  localStorage.setItem("driveFiles", JSON.stringify(files));
  renderFileList();
}

function renderFileList() {
  const files = JSON.parse(localStorage.getItem("driveFiles") || "[]");
  fileList.innerHTML = "";

  files.forEach((file, index) => {
    const div = document.createElement("div");
    div.className = "file-item";
    div.innerHTML = `
      <div>
        <strong>${file.name}</strong><br/>
        <small>${(file.size / 1024).toFixed(2)} KB</small>
      </div>
      <button onclick="deleteFile(${index})">Hapus</button>
    `;
    fileList.appendChild(div);
  });
}

window.onload = renderFileList;
