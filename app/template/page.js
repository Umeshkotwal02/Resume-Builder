"use client";
import React, { useState, useRef } from "react";
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
import { FaGithub, FaPhoneAlt } from "react-icons/fa";
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
import { BsFillPersonFill } from "react-icons/bs";
import ".././assets/styles/template.scss";
import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";

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
      // {
      //   id: 2,
      //   degree: "High School Diploma",
      //   institution: "ABC Senior Secondary School",
      //   location: "Surat, GJ",
      //   period: "2013 - 2015",
      //   description:
      //     "Completed higher secondary education with a focus on Mathematics and Computer Science.",
      // },
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

  const [activeField, setActiveField] = useState(null);
  const [textFormat, setTextFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    align: "left",
    fontFamily: "Times New Roman",
  });
  const resumeRef = useRef();

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
    content: () => resumeRef.current,
    documentTitle: "resume",
    removeAfterPrint: true,
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

  // Export Resume to PDF
  // const downloadPDF = () => {
  //   const doc = new jsPDF("p", "mm", "a4");

  //   doc.html(resumeRef.current, {
  //     callback: function (doc) {
  //       doc.save("resume.pdf");
  //     },
  //     x: 10,
  //     y: 10,
  //     width: 190, // fits within A4
  //     windowWidth: resumeRef.current.scrollWidth,
  //   });
  // };

  const downloadPDF = () => {
    const input = resumeRef.current;

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

      pdf.save("resume.pdf");
    });
  };

  return (
    <Container fluid className="resume-builder py-4">
      <Row>
        {/* Left Side Form */}
        <Col md={4} className="p-3 form-section">
          <h4 className="mb-4">Edit Resume</h4>

          {/* Text Formatting Toolbar */}
          <Card className="mb-4">
            <Card.Body>
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
                  style={{ width: "120px" }}
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
          <Accordion defaultActiveKey="0" className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Personal Information</Accordion.Header>
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
                    <Form.Label className="text-capitalize">{field}</Form.Label>
                    <Form.Control
                      as={field === "summary" ? "textarea" : "input"}
                      rows={field === "summary" ? 3 : undefined}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      onFocus={() =>
                        setActiveField({ section: field, id: null, field })
                      }
                    />
                  </Form.Group>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Education Section */}
          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="d-flex justify-content-between align-items-center w-100">
                  <span>Education</span>
                  <span
                    className="btn btn-outline-success btn-sm ms-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem("education");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                {formData.education.map((edu, index) => (
                  <Card key={edu.id} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-end mb-2">
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
                      {[
                        "degree",
                        "institution",
                        "location",
                        "period",
                        "description",
                      ].map((field) => (
                        <Form.Group className="mb-2" key={field}>
                          <Form.Label className="text-capitalize">
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
          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="d-flex justify-content-between align-items-center w-100">
                  <span>Education</span>
                  <span
                    className="btn btn-outline-success btn-sm ms-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem("experience");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                {formData.experience.map((exp, index) => (
                  <Card key={exp.id} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-end mb-2">
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
                          <Form.Label className="text-capitalize">
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
          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="d-flex justify-content-between align-items-center w-100">
                  <span>Skills</span>
                  <span
                    className="btn btn-outline-success btn-sm ms-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem("skills");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                {formData.skills.map((skill, index) => (
                  <Card key={skill.id} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-end mb-2">
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
                          <Form.Label className="text-capitalize">
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
          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>Projects</span>
                <span
                  className="btn btn-outline-success btn-sm ms-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem("projects");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              </div>
              <Accordion.Body>
                {formData.projects.map((project, index) => (
                  <Card key={project.id} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-end mb-2">
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
                          <Form.Label className="text-capitalize">
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
                          />
                        </Form.Group>
                      ))}
                    </Card.Body>
                  </Card>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Button variant="success" onClick={downloadPDF} className="w-100">
            <FontAwesomeIcon icon={faDownload} className="me-2" />
            Download PDF
          </Button>
          <Button
            variant="primary"
            onClick={() => window.print()}
            className="w-100 mt-2 no-print"
          >
            🖨️ Print Resume
          </Button>
        </Col>

        {/* Right Side Resume Preview */}
        <Col md={8} className="p-4">
          <div
            ref={resumeRef}
            className="resume-preview shadow-lg p-4 bg-white"
            style={{ fontFamily: textFormat.fontFamily }}
          >
            <h1
              className="text-center mb-1"
              style={{
                fontWeight: textFormat.bold ? "bold" : "normal",
                textAlign: textFormat.align,
              }}
            >
              {formData.name}
            </h1>
            <h4
              className="text-center"
              style={{
                fontStyle: textFormat.italic ? "italic" : "normal",
                textAlign: textFormat.align,
                textDecoration: textFormat.underline ? "underline" : "none",
              }}
            >
              {formData.title}
            </h4>

            <div className="d-flex justify-content-center">
              <span className="me-2">
                {" "}
                <span className="me-1">
                  {" "}
                  <MdEmail />
                </span>{" "}
                {formData.email}
              </span>
              <span className="me-2">|</span>
              <span className="me-2">
                <span className="me-1">
                  {" "}
                  <FaPhoneAlt />
                </span>{" "}
                {formData.phone}
              </span>
              <span className="me-2">|</span>
              <span>
                <span className="me-1">
                  {" "}
                  <FaMapMarkerAlt />
                </span>{" "}
                {formData.location}
              </span>
            </div>

            <div className="d-flex justify-content-center">
              <span className="me-2">
                {" "}
                <span className="me-1">
                  {" "}
                  <MdEmail />
                </span>{" "}
                {formData.github}
              </span>
              <span className="me-2">|</span>
              <span className="me-2">
                <span className="me-1">
                  {" "}
                  <FaGithub />
                </span>{" "}
                {formData.linkedin}
              </span>
              <span className="me-2">|</span>
              <span>
                <span className="me-1">
                  {" "}
                  <BsFillPersonFill />
                </span>{" "}
                {formData.portfolio}
              </span>
            </div>

            <hr />

            <h5>Summary</h5>
            <p>{formData.summary}</p>

            <hr />

            <h5>Education</h5>
            {formData.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="d-flex justify-content-between">
                  <strong>{edu.degree}</strong>
                  <span>{edu.period}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <em>{edu.institution}</em>
                  <span>{edu.location}</span>
                </div>
                <p>{edu.description}</p>
              </div>
            ))}

            <hr />

            <h5>Experience</h5>
            {formData.experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="d-flex justify-content-between">
                  <strong>{exp.position}</strong>
                  <span>{exp.period}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <em>{exp.company}</em>
                  <span>{exp.location}</span>
                </div>
                <p>{exp.description}</p>
              </div>
            ))}

            <hr />

            <h5>Skills</h5>
            <div className="skills-grid">
              {formData.skills.map((skill) => (
                <div key={skill.id} className="skill-item">
                  <strong>{skill.name}:</strong> {skill.level}
                </div>
              ))}
            </div>

            <hr />

            <h5>Projects</h5>
            {formData.projects.map((project) => (
              <div key={project.id} className="mb-3">
                <strong>{project.name}</strong>
                <p className="mb-1">
                  <em>Technologies: {project.technologies}</em>
                </p>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResumeBuilder;
