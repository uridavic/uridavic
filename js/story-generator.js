document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("story-generator-app");
    if (!app || !Array.isArray(window.URIDAVIC_STORIES)) return;

    const storySelect = app.querySelector("#story-select");
    const form = app.querySelector("#story-form");
    const questionsContainer = app.querySelector("#story-questions");
    const formPanel = app.querySelector("#story-form-panel");
    const resultPanel = app.querySelector("#story-result-panel");
    const resultTitle = app.querySelector("#story-result-title");
    const resultText = app.querySelector("#story-result-text");
    const errorBox = app.querySelector("#story-error-box");
    const statusBox = app.querySelector("#story-status-box");
    const clearButton = app.querySelector("#story-clear");
    const resetButton = app.querySelector("#story-reset");
    const copyButton = app.querySelector("#story-copy");
    const storyStatus = app.querySelector("#story-status-left");

    let activeStory = null;
    let generatedStory = "";

    function sanitizeInput(value) {
        return value
            .trim()
            .replace(/\s+/g, " ")
            .replace(/[<>]/g, "");
    }

    function clearMessages() {
        errorBox.textContent = "";
        statusBox.textContent = "";
        errorBox.classList.remove("is-visible");
        statusBox.classList.remove("is-visible");
    }

    function showError(message) {
        errorBox.textContent = message;
        errorBox.classList.add("is-visible");
    }

    function showStatus(message) {
        statusBox.textContent = message;
        statusBox.classList.add("is-visible");
    }

    function setFieldError(fieldId, message) {
        const field = app.querySelector(`[data-story-field="${fieldId}"]`);
        const error = app.querySelector(`[data-story-error="${fieldId}"]`);
        if (field) field.classList.toggle("has-error", Boolean(message));
        if (error) error.textContent = message || "";
    }

    function populateStorySelect() {
        storySelect.innerHTML = "";

        window.URIDAVIC_STORIES.forEach((story) => {
            const option = document.createElement("option");
            option.value = story.id;
            option.textContent = story.titulo;
            storySelect.appendChild(option);
        });
    }

    function renderQuestions(story) {
        questionsContainer.innerHTML = "";
        activeStory = story;
        clearMessages();

        story.preguntas.forEach((question) => {
            const field = document.createElement("div");
            field.className = "story-field";
            field.dataset.storyField = question.id;

            const label = document.createElement("label");
            label.setAttribute("for", `story-input-${question.id}`);
            label.textContent = question.texto;

            const input = document.createElement("input");
            input.type = "text";
            input.id = `story-input-${question.id}`;
            input.name = question.id;
            input.placeholder = question.placeholder;
            input.maxLength = question.maxlength;
            input.required = true;
            input.autocomplete = "off";

            const error = document.createElement("div");
            error.className = "story-error-message";
            error.dataset.storyError = question.id;

            input.addEventListener("input", () => {
                setFieldError(question.id, "");
                clearMessages();
            });

            field.append(label, input, error);
            questionsContainer.appendChild(field);
        });

        storyStatus.textContent = `${story.preguntas.length} preguntas listas`;
    }

    function getSelectedStory() {
        return window.URIDAVIC_STORIES.find((story) => story.id === storySelect.value);
    }

    function validateAnswers() {
        const answers = {};
        let firstInvalidInput = null;

        activeStory.preguntas.forEach((question) => {
            const input = form.elements[question.id];
            const cleanValue = sanitizeInput(input.value);

            if (!cleanValue) {
                setFieldError(question.id, "Campo obligatorio.");
                if (!firstInvalidInput) firstInvalidInput = input;
                return;
            }

            if (cleanValue.length > question.maxlength) {
                setFieldError(question.id, `Maximo ${question.maxlength} caracteres.`);
                if (!firstInvalidInput) firstInvalidInput = input;
                return;
            }

            setFieldError(question.id, "");
            answers[question.id] = cleanValue;
        });

        return {
            answers,
            firstInvalidInput,
            isValid: !firstInvalidInput
        };
    }

    function generateStory(template, answers) {
        return template.replace(/\{\{([a-zA-Z0-9_-]+)\}\}/g, (match, key) => answers[key] || match);
    }

    function showResult(storyText) {
        generatedStory = storyText;
        resultTitle.textContent = activeStory.titulo;
        resultText.textContent = storyText;
        formPanel.hidden = true;
        resultPanel.hidden = false;
        resultPanel.classList.add("is-visible");
        storyStatus.textContent = "Historia generada";
        clearMessages();
    }

    function backToForm() {
        resultPanel.hidden = true;
        resultPanel.classList.remove("is-visible");
        formPanel.hidden = false;
        generatedStory = "";
        storyStatus.textContent = `${activeStory.preguntas.length} preguntas listas`;
        clearMessages();
    }

    function clearForm() {
        activeStory.preguntas.forEach((question) => {
            const input = form.elements[question.id];
            if (input) input.value = "";
            setFieldError(question.id, "");
        });

        generatedStory = "";
        clearMessages();
        storyStatus.textContent = `${activeStory.preguntas.length} preguntas listas`;

        const firstInput = form.elements[activeStory.preguntas[0].id];
        if (firstInput) firstInput.focus();
    }

    function buildCopyText() {
        const year = new Date().getFullYear();
        return `${activeStory.titulo}\n\n${generatedStory}\n\nGenerador de historias, URIDAVIC Corp. (${year})`;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearMessages();

        const validation = validateAnswers();
        if (!validation.isValid) {
            showError("Completa todos los campos marcados para generar tu historia.");
            validation.firstInvalidInput.focus();
            return;
        }

        showResult(generateStory(activeStory.plantilla, validation.answers));
    });

    storySelect.addEventListener("change", () => {
        renderQuestions(getSelectedStory());
    });

    clearButton.addEventListener("click", () => {
        clearForm();
    });

    resetButton.addEventListener("click", () => {
        backToForm();
    });

    copyButton.addEventListener("click", () => {
        clearMessages();

        if (!generatedStory) {
            showError("No hay historia para copiar.");
            return;
        }

        navigator.clipboard.writeText(buildCopyText())
            .then(() => {
                showStatus("Historia copiada al portapapeles.");
            })
            .catch(() => {
                showError("No se pudo copiar automaticamente. Revisa los permisos del navegador.");
            });
    });

    populateStorySelect();
    renderQuestions(window.URIDAVIC_STORIES[0]);
});
