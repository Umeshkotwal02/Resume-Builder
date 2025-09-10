"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Card,
  Accordion,
} from "react-bootstrap";
import jsPDF from "jspdf";
import {
  FaGithub,
  FaPhoneAlt,
  FaRegEdit,
  FaLinkedin,
  FaProjectDiagram,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faPlus,
  faTrash,
  faArrowUp,
  faArrowDown,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";
import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";
import { FaBriefcase, FaChevronDown } from "react-icons/fa6";
import { AiOutlineShareAlt } from "react-icons/ai";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiGraduationCapFill } from "react-icons/ri";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    title: "Frontend Developer",
    email: "johndoe@email.com",
    phone: "+91 9876543210",
    location: "New York, NY",
    github: "https://github.com/john-doe",
    linkedin: "https://linkedin.com/in/john-doe",
    portfolio: "https://johndoe.dev",
    summary:
      "Resourceful Frontend Developer with 5+ years of experience in designing, developing, and optimizing scalable web applications. Proficient in React, Next.js, and modern JavaScript frameworks with a strong focus on responsive design and performance. Passionate about delivering exceptional user experiences and mentoring junior developers.",

    education: [
      {
        id: 1,
        degree: "B.Tech in Computer Science",
        institution: "VNSGU University",
        location: "Surat, GJ",
        period: "2015 - 2019",
        description:
          "Graduated with honors. Specialized in Web Technologies and Software Engineering. Relevant coursework: Data Structures, Algorithms, Database Management, Web Development.",
      },
    ],

    experience: [
      {
        id: 1,
        position: "Senior Frontend Developer",
        company: "Sridix Technology",
        location: "Udhana, Surat",
        period: "2021 - Present",
        description:
          "Lead a team of 5 frontend developers to build scalable applications. Optimized performance of React apps, reducing load times by 30%. Integrated REST APIs and implemented CI/CD pipelines for faster deployments.",
      },
      {
        id: 3,
        position: "Web Developer Intern",
        company: "XYZ Solutions",
        location: "Surat, GJ",
        period: "2018 - 2019",
        description:
          "Assisted in building internal dashboards with HTML, CSS, and JavaScript. Improved website accessibility and SEO by implementing best practices.",
      },
    ],

    skills: [
      { id: 1, name: "React.js", level: "Expert" },
      { id: 2, name: "Next.js", level: "Advanced" },
      { id: 3, name: "JavaScript (ES6+)", level: "Expert" },
      { id: 4, name: "TypeScript", level: "Intermediate" },
      { id: 5, name: "HTML5 & CSS3", level: "Expert" },
      { id: 6, name: "Bootstrap/Tailwind", level: "Advanced" },
      { id: 7, name: "Node.js & Express", level: "Intermediate" },
    ],

    projects: [
      {
        id: 1,
        name: "E-commerce Platform",
        technologies: "React, Node.js, MongoDB, Stripe API",
        description:
          "Developed a full-stack e-commerce application with product search, user authentication, shopping cart, and secure payment integration.",
      },
    ],

    certifications: [
      {
        id: 1,
        title: "React Developer Certification",
        provider: "Udemy",
        year: "2021",
      },
      {
        id: 2,
        title: "JavaScript Algorithms and Data Structures",
        provider: "freeCodeCamp",
        year: "2020",
      },
    ],

    languages: [
      { id: 1, name: "English", level: "Fluent" },
      { id: 2, name: "Hindi", level: "Fluent" },
      { id: 3, name: "Gujarati", level: "Native" },
    ],
  });

  const [resumeTitle, setResumeTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [textFormat, setTextFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    align: "center",
    fontFamily: "Arial",
  });
  const [activeAccordion, setActiveAccordion] = useState("0");
  const contentRef = useRef();
  const formSectionRef = useRef();
  const previewSectionRef = useRef();

  // Handle input changes
  const handleChange = (e, section = null, id = null) => {
    const { name, value } = e.target;

    if (section && id !== null) {
      // For array-based sections (education, experience, etc.)
      setFormData((prev) => ({
        ...prev,
        [section]: prev[section].map((item) =>
          item.id === id ? { ...item, [name]: value } : item
        ),
      }));
    } else {
      // For simple fields
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add new item to a section
  const addItem = (section) => {
    const newItem = {
      id: Date.now(),
      ...(section === "education"
        ? {
          degree: "",
          institution: "",
          location: "",
          period: "",
          description: "",
        }
        : section === "experience"
          ? {
            position: "",
            company: "",
            location: "",
            period: "",
            description: "",
          }
          : section === "skills"
            ? {
              name: "",
              level: "",
            }
            : section === "projects"
              ? {
                name: "",
                technologies: "",
                description: "",
              }
              : {}),
    };

    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: resumeTitle?.trim() || formData.name?.trim() || "resume",
    removeAfterPrint: true,
    pageStyle: `
     
    `,
  });


  // Remove item from a section
  const removeItem = (section, id) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };

  // Move item up in a section
  const moveItemUp = (section, index) => {
    if (index === 0) return;

    setFormData((prev) => {
      const newArray = [...prev[section]];
      [newArray[index], newArray[index - 1]] = [
        newArray[index - 1],
        newArray[index],
      ];
      return { ...prev, [section]: newArray };
    });
  };

  // Move item down in a section
  const moveItemDown = (section, index) => {
    setFormData((prev) => {
      if (index === prev[section].length - 1) return prev;

      const newArray = [...prev[section]];
      [newArray[index], newArray[index + 1]] = [
        newArray[index + 1],
        newArray[index],
      ];
      return { ...prev, [section]: newArray };
    });
  };

  // Handle text formatting
  const handleFormatChange = (format, value = null) => {
    if (value !== null) {
      setTextFormat((prev) => ({ ...prev, [format]: value }));
    } else {
      setTextFormat((prev) => ({ ...prev, [format]: !prev[format] }));
    }
  };

  // Apply formatting to active field
  const applyFormatting = () => {
    if (!activeField) return;

    let formattedText = formData[activeField.section];
    if (activeField.id !== null) {
      formattedText = formData[activeField.section].find(
        (item) => item.id === activeField.id
      )[activeField.field];
    }

    // Apply formatting logic here (simplified for example)
    // In a real implementation, you would use a contenteditable div or a rich text editor library
    console.log("Applying formatting:", textFormat, "to field:", activeField);
  };

  const downloadPDF = () => {
    const input = contentRef.current;

    // Store original dimensions
    const originalWidth = input.style.width;
    const originalHeight = input.style.height;

    // Set to A4 dimensions (in pixels at 96 DPI)
    const a4Width = 794; // 210mm × 96/25.4 ≈ 794px
    const a4Height = 1123; // 297mm × 96/25.4 ≈ 1123px

    // Apply A4 dimensions to the element
    input.style.width = `${a4Width}px`;
    input.style.height = "auto"; // Let height adjust based on content
    input.style.maxHeight = "none"; // Remove any height restrictions

    // Force a reflow to ensure styles are applied
    input.offsetHeight;

    html2canvas(input, {
      scale: 2,
      width: a4Width,
      height: input.scrollHeight,
      windowWidth: a4Width,
      useCORS: true,
      logging: false,
    }).then((canvas) => {
      // Restore original dimensions
      input.style.width = originalWidth;
      input.style.height = originalHeight;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate image dimensions to fit A4
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add extra pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName =
        (resumeTitle?.trim() || formData.name?.trim() || "resume") + ".pdf";

      pdf.save(fileName);
    });
  };

  // Handle accordion toggle
  const handleAccordionToggle = (eventKey) => {
    setActiveAccordion(activeAccordion === eventKey ? "" : eventKey);
  };

  return (
    <div className="resume-builder-container">
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#" className="text-decoration-none">
              Home
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Resume Builder
          </li>
        </ol>
      </nav>

      <div className="header-controls">
        <div className="resume-title-section">
          <h4 className="resume-title">
            {resumeTitle || formData.name
              ? `${resumeTitle || formData.name}'s Resume`
              : "Edit Resume"}
          </h4>
          <FaRegEdit
            className="edit-icon"
            onClick={() => {
              setResumeTitle(resumeTitle || formData.name);
              setIsModalOpen(true);
            }}
          />
        </div>

        <div className="action-buttons">
          <div className="change-template-btn">Change Template</div>
          <button className="btn share-btn">
            <AiOutlineShareAlt className="fs-5" />
          </button>
          <button className="btn download-btn" onClick={downloadPDF}>
            <span className="fw-bold">
              Download <FaChevronDown className="fs-6" />
            </span>
          </button>
        </div>
      </div>

      <hr className="divider" />

      <div className="builder-content">
        {/* Left Side Form */}
        <div className="form-section" ref={formSectionRef}>
          {/* Text Formatting Toolbar */}
          <Card className="format-toolbar mb-4">
            <Card.Body>
              <h6 className="toolbar-title">Text Formatting</h6>
              <div className="d-flex flex-wrap gap-2 mb-2">
                <Button
                  variant={textFormat.bold ? "primary" : "outline-secondary"}
                  size="sm"
                  onClick={() => handleFormatChange("bold")}
                >
                  <FontAwesomeIcon icon={faBold} />
                </Button>
                <Button
                  variant={textFormat.italic ? "primary" : "outline-secondary"}
                  size="sm"
                  onClick={() => handleFormatChange("italic")}
                >
                  <FontAwesomeIcon icon={faItalic} />
                </Button>
                <Button
                  variant={
                    textFormat.underline ? "primary" : "outline-secondary"
                  }
                  size="sm"
                  onClick={() => handleFormatChange("underline")}
                >
                  <FontAwesomeIcon icon={faUnderline} />
                </Button>
                <Button
                  variant={
                    textFormat.align === "left"
                      ? "primary"
                      : "outline-secondary"
                  }
                  size="sm"
                  onClick={() => handleFormatChange("align", "left")}
                >
                  <FontAwesomeIcon icon={faAlignLeft} />
                </Button>
                <Button
                  variant={
                    textFormat.align === "center"
                      ? "primary"
                      : "outline-secondary"
                  }
                  size="sm"
                  onClick={() => handleFormatChange("align", "center")}
                >
                  <FontAwesomeIcon icon={faAlignCenter} />
                </Button>
                <Button
                  variant={
                    textFormat.align === "right"
                      ? "primary"
                      : "outline-secondary"
                  }
                  size="sm"
                  onClick={() => handleFormatChange("align", "right")}
                >
                  <FontAwesomeIcon icon={faAlignRight} />
                </Button>
                <Form.Select
                  size="sm"
                  className="font-select"
                  value={textFormat.fontFamily}
                  onChange={(e) =>
                    handleFormatChange("fontFamily", e.target.value)
                  }
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Courier New">Courier New</option>
                </Form.Select>
              </div>
              <Button size="sm" onClick={applyFormatting}>
                Apply Formatting
              </Button>
            </Card.Body>
          </Card>

          {/* Personal Information */}
          <Accordion
            activeKey={activeAccordion}
            onSelect={handleAccordionToggle}
            className="mb-2 section-accordion"
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                {" "}
                <IoPersonCircleSharp className="pe-2 fs-3" /> Personal Info
              </Accordion.Header>
              <Accordion.Body>
                {[
                  "name",
                  "title",
                  "email",
                  "phone",
                  "github",
                  "linkedin",
                  "portfolio",
                  "location",
                  "summary",
                ].map((field) => (
                  <Form.Group className="mb-3" key={field}>
                    <Form.Label className="text-capitalize form-label">
                      {field}
                    </Form.Label>
                    <Form.Control
                      as={field === "summary" ? "textarea" : "input"}
                      rows={field === "summary" ? 3 : undefined}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      onFocus={() =>
                        setActiveField({ section: field, id: null, field })
                      }
                      className="form-input"
                    />
                  </Form.Group>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Education Section */}

          <Accordion
            activeKey={activeAccordion}
            onSelect={handleAccordionToggle}
            className="mb-2 section-accordion"
          >
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                {" "}
                <RiGraduationCapFill className="pe-2 fs-3" /> Education
              </Accordion.Header>
              <Accordion.Body>
                {/* Add Education Button at the top, full width */}
                <div className="mb-3 d-flex justify-content-end">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => addItem("education")}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-1" />
                    Add Education
                  </Button>
                </div>

                {/* Education Items */}
                {formData.education.length === 0 && (
                  <p className="text-center text-muted">
                    No education added yet.
                  </p>
                )}

                {formData.education.map((edu, index) => (
                  <Card key={edu.id} className="mb-3 item-card shadow-sm">
                    <Card.Body>
                      <div className="d-flex justify-content-end mb-2 item-controls">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-1"
                          disabled={index === 0}
                          onClick={() => moveItemUp("education", index)}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-1"
                          disabled={index === formData.education.length - 1}
                          onClick={() => moveItemDown("education", index)}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeItem("education", edu.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>

                      {/* Education Fields */}
                      {[
                        "degree",
                        "institution",
                        "location",
                        "period",
                        "description",
                      ].map((field) => (
                        <Form.Group className="mb-2" key={field}>
                          <Form.Label className="text-capitalize form-label">
                            {field}
                          </Form.Label>
                          <Form.Control
                            as={field === "description" ? "textarea" : "input"}
                            rows={field === "description" ? 2 : undefined}
                            name={field}
                            value={edu[field]}
                            onChange={(e) =>
                              handleChange(e, "education", edu.id)
                            }
                            onFocus={() =>
                              setActiveField({
                                section: "education",
                                id: edu.id,
                                field,
                              })
                            }
                            className="form-input"
                            placeholder={`Enter ${field}`}
                          />
                        </Form.Group>
                      ))}
                    </Card.Body>
                  </Card>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Experience Section */}
          <Accordion
            activeKey={activeAccordion}
            onSelect={handleAccordionToggle}
            className="mb-2 section-accordion"
          >
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <FaBriefcase className="pe-2 fs-3" /> Experience{" "}
              </Accordion.Header>
              <Accordion.Body>
                <div className="mb-3 d-flex justify-content-end">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => addItem("experience")}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-1" />
                    Add experience
                  </Button>
                </div>
                {formData.experience.map((exp, index) => (
                  <Card key={exp.id} className="mb-3 item-card">
                    <Card.Body>
                      <div className="d-flex justify-content-end mb-2 item-controls">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-1"
                          disabled={index === 0}
                          onClick={() => moveItemUp("experience", index)}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-1"
                          disabled={index === formData.experience.length - 1}
                          onClick={() => moveItemDown("experience", index)}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeItem("experience", exp.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                      {[
                        "position",
                        "company",
                        "location",
                        "period",
                        "description",
                      ].map((field) => (
                        <Form.Group className="mb-2" key={field}>
                          <Form.Label className="text-capitalize form-label">
                            {field}
                          </Form.Label>
                          <Form.Control
                            as={field === "description" ? "textarea" : "input"}
                            rows={field === "description" ? 3 : undefined}
                            name={field}
                            value={exp[field]}
                            onChange={(e) =>
                              handleChange(e, "experience", exp.id)
                            }
                            onFocus={() =>
                              setActiveField({
                                section: "experience",
                                id: exp.id,
                                field,
                              })
                            }
                            className="form-input"
                          />
                        </Form.Group>
                      ))}
                    </Card.Body>
                  </Card>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Skills Section */}
          <Accordion
            activeKey={activeAccordion}
            onSelect={handleAccordionToggle}
            className="mb-2 section-accordion"
          >
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                {" "}
                <GiSkills className="pe-2 fs-3" />
                Skills{" "}
              </Accordion.Header>
              <Accordion.Body>
                <div className="mb-3 d-flex justify-content-end">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => addItem("skills")}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-1" />
                    Add Skills
                  </Button>
                </div>
                {formData.skills.map((skill, index) => (
                  <Card key={skill.id} className="mb-3 item-card">
                    <Card.Body>
                      <div className="d-flex justify-content-end mb-2 item-controls">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-1"
                          disabled={index === 0}
                          onClick={() => moveItemUp("skills", index)}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-1"
                          disabled={index === formData.skills.length - 1}
                          onClick={() => moveItemDown("skills", index)}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeItem("skills", skill.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                      {["name", "level"].map((field) => (
                        <Form.Group className="mb-2" key={field}>
                          <Form.Label className="text-capitalize form-label">
                            {field}
                          </Form.Label>
                          <Form.Control
                            name={field}
                            value={skill[field]}
                            onChange={(e) =>
                              handleChange(e, "skills", skill.id)
                            }
                            onFocus={() =>
                              setActiveField({
                                section: "skills",
                                id: skill.id,
                                field,
                              })
                            }
                            className="form-input"
                          />
                        </Form.Group>
                      ))}
                    </Card.Body>
                  </Card>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Projects Section */}
          <Accordion
            activeKey={activeAccordion}
            onSelect={handleAccordionToggle}
            className="mb-2 section-accordion"
          >
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                {" "}
                <FaProjectDiagram className="pe-2 fs-3" /> Projects{" "}
              </Accordion.Header>
              <Accordion.Body>
                <div className="mb-3 d-flex justify-content-end">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => addItem("projects")}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-1" />
                    Add projects
                  </Button>
                </div>
                {formData.projects.map((project, index) => (
                  <Card key={project.id} className="mb-3 item-card">
                    <Card.Body>
                      <div className="d-flex justify-content-end mb-2 item-controls">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-1"
                          disabled={index === 0}
                          onClick={() => moveItemUp("projects", index)}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-1"
                          disabled={index === formData.projects.length - 1}
                          onClick={() => moveItemDown("projects", index)}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeItem("projects", project.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                      {["name", "technologies", "description"].map((field) => (
                        <Form.Group className="mb-2" key={field}>
                          <Form.Label className="text-capitalize form-label">
                            {field}
                          </Form.Label>
                          <Form.Control
                            as={field === "description" ? "textarea" : "input"}
                            rows={field === "description" ? 3 : undefined}
                            name={field}
                            value={project[field]}
                            onChange={(e) =>
                              handleChange(e, "projects", project.id)
                            }
                            onFocus={() =>
                              setActiveField({
                                section: "projects",
                                id: project.id,
                                field,
                              })
                            }
                            className="form-input"
                          />
                        </Form.Group>
                      ))}
                    </Card.Body>
                  </Card>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="action-buttons-bottom d-flex gap-2">
            <Button
              variant="success"
              onClick={downloadPDF}
              className="download-pdf-btn flex-grow-1"
            >
              <FontAwesomeIcon icon={faDownload} className="me-2" />
              Download PDF
            </Button>
            <Button
              variant="primary"
              onClick={handlePrint}
              className="print-btn flex-grow-1"
            >
              🖨️ Print Resume
            </Button>
          </div>
        </div>

        {/* Right Side Resume Preview */}
        <div className="preview-section" ref={previewSectionRef}>
          <div
            ref={contentRef}
            className="resume-preview page-break"
            style={{ fontFamily: textFormat.fontFamily }}
          >
            <h1
              className="resume-name"
              style={{
                fontWeight: textFormat.bold ? "bold" : "normal",
                textAlign: textFormat.align,
              }}
            >
              {formData.name}
            </h1>
            <h4
              className="resume-title-preview"
              style={{
                fontStyle: textFormat.italic ? "italic" : "normal",
                textAlign: textFormat.align,
                textDecoration: textFormat.underline ? "underline" : "none",
              }}
            >
              {formData.title}
            </h4>

            <div className="contact-info">
              <div className="contact-line">
                <span className="contact-item">
                  <MdEmail className="contact-icon" />
                  {formData.email}
                </span>
                <span className="contact-separator">|</span>
                <span className="contact-item">
                  <FaPhoneAlt className="contact-icon" />
                  {formData.phone}
                </span>
                <span className="contact-separator">|</span>
                <span className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  {formData.location}
                </span>
              </div>
              <div className="contact-line">
                <span className="contact-item">
                  <FaGithub className="contact-icon" />
                  {formData.github}
                </span>
                <span className="contact-separator">|</span>
                <span className="contact-item">
                  <FaLinkedin className="contact-icon" />
                  {formData.linkedin}
                </span>
                <span className="contact-separator">|</span>
                <span className="contact-item">
                  <BsFillPersonFill className="contact-icon" />
                  {formData.portfolio}
                </span>
              </div>
            </div>

            <hr />

            <h5 className="section-title">Summary</h5>
            <p className="summary-text">{formData.summary}</p>

            {formData.education.length > 0 && (
              <>
                <hr className="" />
                <h5 className="section-title"> Education</h5>
              </>
            )}
            {formData.education.map((edu) => (
              <div key={edu.id} className="education-item">
                <div className="d-flex justify-content-between">
                  <strong className="degree">{edu.degree}</strong>
                  <span className="period">{edu.period}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <em className="institution">{edu.institution}</em>
                  <span className="location">{edu.location}</span>
                </div>
                <p className="education-description">{edu.description}</p>
              </div>
            ))}

            {formData.experience.length > 0 && (
              <>
                <hr className="" />
                <h5 className="section-title">Experience</h5>
              </>
            )}
            {formData.experience.map((exp) => (
              <div key={exp.id} className="experience-item">
                <div className="d-flex justify-content-between">
                  <strong className="position">{exp.position}</strong>
                  <span className="period">{exp.period}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <em className="company">{exp.company}</em>
                  <span className="location">{exp.location}</span>
                </div>
                <p className="experience-description">{exp.description}</p>
              </div>
            ))}

            {formData.skills.length > 0 && (
              <>
                <hr className="" />
                <h5 className="section-title">Skills</h5>
              </>
            )}
            <div className="skills-grid">
              {formData.skills.map((skill) => (
                <div key={skill.id} className="skill-item">
                  <strong>{skill.name}:</strong> {skill.level}
                </div>
              ))}
            </div>

            {formData.projects.length > 0 && (
              <>
                <hr className="" />
                <h5 className="section-title">Projects</h5>
              </>
            )}
            {formData.projects.map((project) => (
              <div key={project.id} className="project-item">
                <strong className="project-name">{project.name}</strong>
                <p className="project-tech">
                  <em>Technologies: {project.technologies}</em>
                </p>
                <p className="project-description">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="modal-backdrop show custom-backdrop"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal */}
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Resume Title</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsModalOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    value={resumeTitle}
                    onChange={(e) => setResumeTitle(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResumeBuilder;
