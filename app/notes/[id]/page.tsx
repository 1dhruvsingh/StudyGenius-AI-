"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, FileText, BookOpen, FileQuestion, Highlighter, Share2, Bookmark, BookmarkCheck, Volume as VolumeUp, VolumeX } from "lucide-react";

export default function NotePage({ params }: { params: { id: string } }) {
  const [isReading, setIsReading] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Mock data for the note
  const note = {
    id: params.id,
    title: "Cell Division and Reproduction",
    subject: "Biology 101",
    createdAt: "March 3, 2025",
    content: `
      <h1>Cell Division and Reproduction</h1>
      
      <h2>Introduction to Cell Division</h2>
      <p>Cell division is the process by which a parent cell divides into two or more daughter cells. It is a small segment of the cell cycle—the life of a cell from its origin in the division of a parent cell until its own division into two daughter cells. Depending on the type of cell, there are two ways by which cells divide: mitosis and meiosis.</p>
      
      <h3>The Cell Cycle</h3>
      <p>The cell cycle consists of interphase and the mitotic phase. During interphase, the cell grows, accumulates nutrients, and duplicates its DNA in preparation for cell division. The mitotic phase includes mitosis, which is the division of the nucleus, and cytokinesis, which is the division of the cytoplasm.</p>
      
      <h4>Interphase</h4>
      <p>Interphase is composed of three stages:</p>
      <ul>
        <li><strong>G1 Phase (Gap 1):</strong> Cell growth and normal metabolic roles</li>
        <li><strong>S Phase (Synthesis):</strong> DNA replication occurs</li>
        <li><strong>G2 Phase (Gap 2):</strong> Preparation for mitosis, organelle duplication</li>
      </ul>
      
      <h2>Mitosis</h2>
      <p>Mitosis is the process by which a eukaryotic cell separates the chromosomes in its cell nucleus into two identical sets in two nuclei. It is generally followed immediately by cytokinesis, which divides the nuclei, cytoplasm, organelles, and cell membrane into two cells containing roughly equal shares of these cellular components.</p>
      
      <h3>Stages of Mitosis</h3>
      <ol>
        <li><strong>Prophase:</strong> Chromatin condenses into chromosomes, nuclear envelope breaks down, spindle fibers form</li>
        <li><strong>Metaphase:</strong> Chromosomes align at the metaphase plate (the equator of the cell)</li>
        <li><strong>Anaphase:</strong> Sister chromatids separate and move to opposite poles of the cell</li>
        <li><strong>Telophase:</strong> Nuclear envelopes reform, chromosomes decondense, and cytokinesis usually begins</li>
      </ol>
      
      <h2>Meiosis</h2>
      <p>Meiosis is a special type of cell division that reduces the chromosome number by half, creating four haploid cells, each genetically distinct from the parent cell. This process occurs in sexually reproducing organisms and ensures genetic diversity in the population.</p>
      
      <h3>Stages of Meiosis</h3>
      <p>Meiosis consists of two consecutive cell divisions, known as Meiosis I and Meiosis II:</p>
      
      <h4>Meiosis I</h4>
      <ul>
        <li><strong>Prophase I:</strong> Homologous chromosomes pair up and exchange genetic material (crossing over)</li>
        <li><strong>Metaphase I:</strong> Homologous pairs align at the metaphase plate</li>
        <li><strong>Anaphase I:</strong> Homologous chromosomes separate and move to opposite poles</li>
        <li><strong>Telophase I:</strong> Nuclear envelopes may reform, and cytokinesis occurs</li>
      </ul>
      
      <h4>Meiosis II</h4>
      <ul>
        <li><strong>Prophase II:</strong> Chromosomes condense</li>
        <li><strong>Metaphase II:</strong> Chromosomes align at the metaphase plate</li>
        <li><strong>Anaphase II:</strong> Sister chromatids separate and move to opposite poles</li>
        <li><strong>Telophase II:</strong> Nuclear envelopes reform, and cytokinesis occurs</li>
      </ul>
      
      <h2>Comparison of Mitosis and Meiosis</h2>
      <table>
        <tr>
          <th>Feature</th>
          <th>Mitosis</th>
          <th>Meiosis</th>
        </tr>
        <tr>
          <td>Purpose</td>
          <td>Growth, repair, asexual reproduction</td>
          <td>Gamete production for sexual reproduction</td>
        </tr>
        <tr>
          <td>Number of divisions</td>
          <td>One</td>
          <td>Two</td>
        </tr>
        <tr>
          <td>Number of daughter cells</td>
          <td>Two</td>
          <td>Four</td>
        </tr>
        <tr>
          <td>Chromosome number in daughter cells</td>
          <td>Diploid (2n)</td>
          <td>Haploid (n)</td>
        </tr>
        <tr>
          <td>Genetic composition</td>
          <td>Identical to parent cell</td>
          <td>Different from parent cell due to crossing over and independent assortment</td>
        </tr>
      </table>
      
      <h2>Regulation of the Cell Cycle</h2>
      <p>The cell cycle is regulated by a series of checkpoints and regulatory proteins. The three key checkpoints are:</p>
      <ol>
        <li><strong>G1 Checkpoint:</strong> Determines if the cell should divide, enter G0 (quiescence), or undergo apoptosis</li>
        <li><strong>G2 Checkpoint:</strong> Ensures DNA is correctly replicated and the cell is ready to divide</li>
        <li><strong>Metaphase Checkpoint:</strong> Ensures all chromosomes are properly attached to the spindle fibers</li>
      </ol>
      
      <h3>Cell Cycle Regulators</h3>
      <p>The main regulators of the cell cycle include:</p>
      <ul>
        <li><strong>Cyclins:</strong> Proteins that regulate the cell cycle by activating cyclin-dependent kinases (CDKs)</li>
        <li><strong>CDKs:</strong> Enzymes that, when activated by cyclins, phosphorylate target proteins to promote cell cycle progression</li>
        <li><strong>Tumor Suppressor Proteins:</strong> Proteins like p53 that prevent uncontrolled cell division</li>
      </ul>
      
      <h2>Clinical Significance</h2>
      <p>Dysregulation of the cell cycle can lead to various diseases, most notably cancer. Cancer cells exhibit uncontrolled cell division due to mutations in genes that regulate the cell cycle. Understanding the mechanisms of cell division is crucial for developing treatments for such diseases.</p>
      
      <h3>Cancer and Cell Division</h3>
      <p>Cancer cells typically have mutations in genes that regulate the cell cycle, such as:</p>
      <ul>
        <li>Oncogenes: Mutated genes that promote excessive cell division</li>
        <li>Tumor suppressor genes: Genes that, when mutated, fail to prevent excessive cell division</li>
      </ul>
      
      <h2>Summary</h2>
      <p>Cell division is a fundamental process in all living organisms, essential for growth, repair, and reproduction. The two main types of cell division, mitosis and meiosis, serve different purposes and result in different outcomes. The regulation of the cell cycle is crucial for normal development and health, and dysregulation can lead to diseases such as cancer.</p>
    `,
    tableOfContents: [
      { id: "intro", title: "Introduction to Cell Division", level: 2 },
      { id: "cell-cycle", title: "The Cell Cycle", level: 3 },
      { id: "interphase", title: "Interphase", level: 4 },
      { id: "mitosis", title: "Mitosis", level: 2 },
      { id: "mitosis-stages", title: "Stages of Mitosis", level: 3 },
      { id: "meiosis", title: "Meiosis", level: 2 },
      { id: "meiosis-stages", title: "Stages of Meiosis", level: 3 },
      { id: "meiosis-1", title: "Meiosis I", level: 4 },
      { id: "meiosis-2", title: "Meiosis II", level: 4 },
      { id: "comparison", title: "Comparison of Mitosis and Meiosis", level: 2 },
      { id: "regulation", title: "Regulation of the Cell Cycle", level: 2 },
      { id: "regulators", title: "Cell Cycle Regulators", level: 3 },
      { id: "clinical", title: "Clinical Significance", level: 2 },
      { id: "cancer", title: "Cancer and Cell Division", level: 3 },
      { id: "summary", title: "Summary", level: 2 },
    ],
    predictedQuestions: [
      {
        question: "Compare and contrast the processes of mitosis and meiosis, highlighting their key differences and biological significance.",
        difficulty: "Medium",
        topics: ["Mitosis", "Meiosis", "Cell Division"],
      },
      {
        question: "Explain the stages of mitosis in detail and describe what happens to the chromosomes during each stage.",
        difficulty: "Medium",
        topics: ["Mitosis", "Chromosomes"],
      },
      {
        question: "Discuss the regulation of the cell cycle and explain how dysregulation can lead to cancer.",
        difficulty: "Hard",
        topics: ["Cell Cycle", "Cancer", "Regulation"],
      },
      {
        question: "Describe the process of crossing over during meiosis and explain its importance for genetic diversity.",
        difficulty: "Medium",
        topics: ["Meiosis", "Genetic Diversity", "Crossing Over"],
      },
      {
        question: "Identify and explain the function of the three main cell cycle checkpoints.",
        difficulty: "Easy",
        topics: ["Cell Cycle", "Checkpoints"],
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">{note.title}</h2>
                    <p className="text-sm text-muted-foreground mb-1">{note.subject}</p>
                    <p className="text-sm text-muted-foreground">Created: {note.createdAt}</p>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <Button variant="outline" className="w-full justify-start" onClick={() => setBookmarked(!bookmarked)}>
                      {bookmarked ? (
                        <>
                          <BookmarkCheck className="mr-2 h-4 w-4 text-green-500" />
                          Bookmarked
                        </>
                      ) : (
                        <>
                          <Bookmark className="mr-2 h-4 w-4" />
                          Bookmark
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => setIsReading(!isReading)}>
                      {isReading ? (
                        <>
                          <VolumeX className="mr-2 h-4 w-4" />
                          Stop Reading
                        </>
                      ) : (
                        <>
                          <VolumeUp className="mr-2 h-4 w-4" />
                          Read Aloud
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Highlighter className="mr-2 h-4 w-4" />
                      Highlight Mode
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Notes
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Table of Contents</h3>
                    <ScrollArea className="h-[300px] pr-4">
                      <ul className="space-y-1">
                        {note.tableOfContents.map((item, index) => (
                          <li key={index} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
                            <a 
                              href={`#${item.id}`} 
                              className="text-sm hover:text-primary transition-colors block py-1"
                            >
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4">
              <Tabs defaultValue="notes">
                <TabsList className="mb-6">
                  <TabsTrigger value="notes" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Notes
                  </TabsTrigger>
                  <TabsTrigger value="questions" className="flex items-center">
                    <FileQuestion className="mr-2 h-4 w-4" />
                    Predicted Questions
                  </TabsTrigger>
                  <TabsTrigger value="flashcards" className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Flashcards
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="notes">
                  <Card>
                    <CardContent className="p-6">
                      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: note.content }} />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="questions">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-6">Predicted Exam Questions</h2>
                      <p className="text-muted-foreground mb-6">
                        Based on your study materials, these questions are likely to appear on your exam. Practice answering them to prepare effectively.
                      </p>
                      
                      <div className="space-y-8">
                        {note.predictedQuestions.map((q, index) => (
                          <div key={index} className="border rounded-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-lg font-medium">Question {index + 1}</h3>
                              <div className="flex items-center">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  q.difficulty === "Easy" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                                  q.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" :
                                  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                }`}>
                                  {q.difficulty}
                                </span>
                              </div>
                            </div>
                            
                            <p className="mb-4">{q.question}</p>
                            
                            <div className="flex flex-wrap gap-2 mt-4">
                              {q.topics.map((topic, i) => (
                                <span key={i} className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                  {topic}
                                </span>
                              ))}
                            </div>
                            
                            <div className="mt-4 flex justify-end">
                              <Button variant="outline" size="sm">View Answer Guide</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex justify-center">
                        <Button>Generate More Questions</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="flashcards">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-6">Study Flashcards</h2>
                      <p className="text-muted-foreground mb-6">
                        Review key concepts with these AI-generated flashcards. Click on a card to reveal the answer.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border rounded-lg p-6 h-64 flex flex-col">
                          <h3 className="text-lg font-medium mb-2">Front</h3>
                          <Separator className="mb-4" />
                          <div className="flex-grow flex items-center justify-center text-center p-4">
                            <p className="text-lg font-medium">What are the four stages of mitosis?</p>
                          </div>
                          <div className="flex justify-end">
                            <Button variant="ghost" size="sm">Flip</Button>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-6 h-64 flex flex-col bg-muted/50">
                          <h3 className="text-lg font-medium mb-2">Back</h3>
                          <Separator className="mb-4" />
                          <div className="flex-grow flex items-center justify-center text-center p-4">
                            <p>The four stages of mitosis are:</p>
                            <ol className="list-decimal list-inside text-left mt-2">
                              <li>Prophase</li>
                              <li>Metaphase</li>
                              <li>Anaphase</li>
                              <li>Telophase</li>
                            </ol>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Hard</Button>
                              <Button variant="outline" size="sm">Good</Button>
                              <Button variant="outline" size="sm">Easy</Button>
                            </div>
                            <Button variant="ghost" size="sm">Flip</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-center">
                        <Button>Generate More Flashcards</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}