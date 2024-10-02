-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "branchName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "file" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "likeId" INTEGER,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hashtag" (
    "id" SERIAL NOT NULL,
    "hashtag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hashtag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "photoId" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "payload" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "photoId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,
    "payload" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "payload" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManageUser" (
    "id" SERIAL NOT NULL,
    "mUserId" TEXT NOT NULL,
    "mUsername" TEXT NOT NULL,
    "mPassword" TEXT NOT NULL,
    "mGrade" INTEGER,
    "mRank" TEXT,
    "mPhoneNum" TEXT,
    "mPhoneNumCompany" TEXT,
    "mPhoneNumInside" TEXT,
    "mPhoneNumFriend" TEXT,
    "mPart" TEXT[],
    "mAvatar" TEXT,
    "mJoiningDate" TIMESTAMP(3),
    "mZipCode" TEXT,
    "mAddresses" TEXT,
    "mAddressDetail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "favoriteStudentState" INTEGER[],
    "resign" TEXT DEFAULT 'N',
    "email" TEXT,
    "frequentlyUsed" TEXT[],
    "lastModifiedBy" TEXT,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "ManageUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentState" (
    "id" SERIAL NOT NULL,
    "campus" TEXT,
    "category" TEXT,
    "stName" TEXT NOT NULL,
    "phoneNum1" TEXT NOT NULL,
    "phoneNum2" TEXT,
    "phoneNum3" TEXT,
    "subject" TEXT[],
    "detail" TEXT,
    "agreement" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "stEmail" TEXT,
    "stAddr" TEXT,
    "subDiv" TEXT,
    "stVisit" TIMESTAMP(3),
    "expEnrollDate" TIMESTAMP(3),
    "perchase" BOOLEAN,
    "birthday" TIMESTAMP(3),
    "currentManagerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "receiptDiv" TEXT DEFAULT '',
    "pic" TEXT DEFAULT '담당자 지정필요',
    "classMethod" TEXT[],
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "StudentState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdviceType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "indexNum" INTEGER,
    "category" TEXT,
    "onOff" TEXT,
    "defaultValue" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "AdviceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultationMemo" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentStateId" INTEGER NOT NULL,
    "manageUserId" INTEGER NOT NULL,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "ConsultationMemo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "subDiv" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fee" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "totalTime" INTEGER DEFAULT 0,
    "teacherName" TEXT DEFAULT '강사명 없음',
    "roomNum" TEXT,
    "exposure" BOOLEAN,
    "subjectCode" TEXT,
    "expiresDateStart" TIMESTAMP(3),
    "expiresDateEnd" TIMESTAMP(3),
    "round" INTEGER NOT NULL,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserActivityLogs" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "UserActivityLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNum1" TEXT NOT NULL,
    "phoneNum2" TEXT,
    "smsAgreement" TEXT NOT NULL,
    "writer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "birthday" TIMESTAMP(3),
    "managerUserId" INTEGER,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentPayment" (
    "id" SERIAL NOT NULL,
    "seScore" INTEGER NOT NULL,
    "tuitionFee" INTEGER,
    "discountAmount" TEXT,
    "cashAmount" INTEGER,
    "cardAmount" INTEGER,
    "actualAmount" INTEGER,
    "unCollectedAmount" INTEGER,
    "receiptClassification" TEXT[],
    "paymentDate" TIMESTAMP(3),
    "studentId" INTEGER NOT NULL,
    "processingManagerId" INTEGER NOT NULL,
    "situationReport" BOOLEAN,
    "amountReceived" INTEGER,
    "subjectId" INTEGER NOT NULL,
    "campus" TEXT,
    "subDiv" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lectureAssignment" TEXT,
    "courseComplete" TEXT DEFAULT '',
    "employment" TEXT,
    "dueDate" TIMESTAMP(3),
    "classCode" TEXT,
    "isWeekend" TEXT,
    "branchId" INTEGER,
    "mZipCode" TEXT,
    "mAddresses" TEXT,
    "mAddressDetail" TEXT,
    "dateOfDroppingOut" TIMESTAMP(3),
    "reasonFordroppingOut" TEXT,
    "supportType" TEXT,
    "lastModifiedTime" TIMESTAMP(3),
    "lastModifiedByUserId" TEXT,
    "lastModifiedByName" TEXT,

    CONSTRAINT "StudentPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploymentStatus" (
    "id" SERIAL NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "stName" TEXT NOT NULL,
    "employmentType" TEXT NOT NULL,
    "dateOfEmployment" TIMESTAMP(3) NOT NULL,
    "companyName" TEXT NOT NULL,
    "businessNum" TEXT NOT NULL,
    "responsibilities" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phoneNum" TEXT NOT NULL,
    "businessSize" TEXT NOT NULL,
    "imploymentInsurance" TEXT NOT NULL,
    "proofOfImployment" TEXT NOT NULL,
    "relatedFields" TEXT NOT NULL,
    "completionType" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "studentPaymentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedByUserId" TEXT NOT NULL,
    "lastModifiedByName" TEXT NOT NULL,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "EmploymentStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EduInfomation" (
    "id" SERIAL NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "stName" TEXT NOT NULL,
    "eduType" TEXT NOT NULL,
    "eduName" TEXT NOT NULL,
    "major" TEXT,
    "graduationStatus" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "studentPaymentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedByUserId" TEXT NOT NULL,
    "lastModifiedByName" TEXT NOT NULL,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "EduInfomation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" SERIAL NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "stName" TEXT NOT NULL,
    "careerDetails" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "studentPaymentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedByUserId" TEXT NOT NULL,
    "lastModifiedByName" TEXT NOT NULL,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" SERIAL NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "stName" TEXT NOT NULL,
    "CAdate" TIMESTAMP(3) NOT NULL,
    "certificateName" TEXT NOT NULL,
    "certificateLevel" TEXT,
    "CertificateIssuer" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "studentPaymentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedByUserId" TEXT NOT NULL,
    "lastModifiedByName" TEXT NOT NULL,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentConsultation" (
    "id" SERIAL NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "stName" TEXT NOT NULL,
    "typeOfConsultation" TEXT NOT NULL,
    "dateOfConsultation" TIMESTAMP(3) NOT NULL,
    "detailsOfConsultation" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "studentPaymentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedByUserId" TEXT NOT NULL,
    "lastModifiedByName" TEXT NOT NULL,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "StudentConsultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HopeForEmployment" (
    "id" SERIAL NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "stName" TEXT NOT NULL,
    "workingArea" TEXT NOT NULL,
    "fieldOfHope" TEXT NOT NULL,
    "hopefulReward" INTEGER NOT NULL,
    "workType" TEXT NOT NULL,
    "workingHours" INTEGER NOT NULL,
    "opinion" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "studentPaymentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedByUserId" TEXT NOT NULL,
    "lastModifiedByName" TEXT NOT NULL,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "HopeForEmployment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploymentRecommendation" (
    "id" SERIAL NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "stName" TEXT NOT NULL,
    "dateOfRecommendation" TIMESTAMP(3) NOT NULL,
    "recruitmentField" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phoneNum" TEXT NOT NULL,
    "dateOfInterview" TIMESTAMP(3) NOT NULL,
    "employmentStatus" TEXT NOT NULL,
    "reasonForNonEmployment" TEXT NOT NULL,
    "certificateOfEmploymentStatus" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "studentPaymentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedByUserId" TEXT NOT NULL,
    "lastModifiedByName" TEXT NOT NULL,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "EmploymentRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreInspection" (
    "id" SERIAL NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "stName" TEXT NOT NULL,
    "dateOfPreInspection" TIMESTAMP(3),
    "preScreenerType" TEXT,
    "preInspectionDetails" TEXT,
    "actionTaken" TEXT,
    "subjectId" INTEGER NOT NULL,
    "studentPaymentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedByUserId" TEXT NOT NULL,
    "lastModifiedByName" TEXT NOT NULL,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "PreInspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegularEvaluationSet" (
    "id" SERIAL NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "statusType" TEXT NOT NULL,
    "evaluationDetails" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedByUserId" TEXT NOT NULL,
    "lastModifiedByName" TEXT NOT NULL,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "RegularEvaluationSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentPortfolio" (
    "id" SERIAL NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "stName" TEXT NOT NULL,
    "isBest" TEXT,
    "url" TEXT[],
    "filePath" TEXT[],
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentPaymentId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "branchId" INTEGER,
    "lastModifiedByUserId" TEXT NOT NULL,
    "lastModifiedByName" TEXT NOT NULL,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "StudentPortfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentDetail" (
    "id" SERIAL NOT NULL,
    "cashOrCard" TEXT NOT NULL,
    "cardCompany" TEXT,
    "cardNum" TEXT,
    "installment" INTEGER,
    "ApprovalNum" TEXT,
    "amountPayment" INTEGER,
    "paymentDate" TIMESTAMP(3),
    "bankName" TEXT,
    "depositorName" TEXT,
    "depositAmount" INTEGER,
    "depositDate" TIMESTAMP(3),
    "studentPaymentId" INTEGER NOT NULL,
    "receiverId" INTEGER,
    "accountingManager" TEXT,
    "reqRefund" BOOLEAN DEFAULT false,
    "reqRefundManager" TEXT,
    "reqRefundManagerId" INTEGER,
    "reqRefundDate" TEXT,
    "refundApproval" BOOLEAN DEFAULT false,
    "refundManager" TEXT,
    "refundApprovalDate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stName" TEXT,
    "cashReceipts" TEXT[],
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "PaymentDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentMemo" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "studentId" INTEGER,
    "manageUserId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "StudentMemo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lectures" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "campus" TEXT,
    "temporaryName" TEXT NOT NULL,
    "subDiv" TEXT NOT NULL,
    "roomNum" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "lecturePeriodStart" TIMESTAMP(3) NOT NULL,
    "lecturePeriodEnd" TIMESTAMP(3) NOT NULL,
    "lectureDetails" TEXT[],
    "lectureTime" TEXT[],
    "eduStatusReport" TEXT NOT NULL,
    "ApprovedNum" INTEGER,
    "confirmedNum" INTEGER,
    "sessionNum" INTEGER,
    "timetableAttached" TEXT,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "Lectures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "attendanceState" TEXT,
    "studentPaymentId" INTEGER NOT NULL,
    "attendanceDate" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "lecturesId" INTEGER NOT NULL,
    "isCanceled" TEXT DEFAULT 'N',
    "attendanceDateTime" TIMESTAMP(3),
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkLogs" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paymentOne" TEXT,
    "paymentTwo" TEXT,
    "paymentThree" TEXT,
    "trainingInfoOne" TEXT[],
    "trainingInfoTwo" TEXT[],
    "trainingInfoThree" TEXT[],
    "trainingInfoFour" TEXT[],
    "trainingInfoFive" TEXT[],
    "trainingInfoSix" TEXT[],
    "trainingInfoSeven" TEXT[],
    "trainingInfoEight" TEXT[],
    "trainingTimeOneday" INTEGER[],
    "trainingTimeTotal" INTEGER[],
    "instruction" TEXT,
    "attendanceSt" TEXT,
    "absentSt" TEXT,
    "tardySt" TEXT,
    "leaveEarlySt" TEXT,
    "outingSt" TEXT,
    "etc" TEXT,
    "checkList" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "checkContext" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "lecturesId" INTEGER NOT NULL,
    "workLogsDate" TEXT NOT NULL,
    "attendanceCount" INTEGER[],
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "WorkLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stamp" (
    "id" SERIAL NOT NULL,
    "manageUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "Stamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkRequest" (
    "id" SERIAL NOT NULL,
    "campus" TEXT,
    "to" TEXT NOT NULL,
    "toId" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "fromId" INTEGER NOT NULL,
    "context" TEXT NOT NULL,
    "read" TEXT NOT NULL DEFAULT 'N',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "WorkRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alarm" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "personalTarget" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "Alarm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sms" (
    "id" SERIAL NOT NULL,
    "receiver" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "manageUserId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "saveType" TEXT,
    "branchId" INTEGER,
    "rDate" TEXT,
    "rTime" TEXT,
    "successType" TEXT,
    "sender" TEXT,
    "failureReason" TEXT,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "Sms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageStorage" (
    "id" SERIAL NOT NULL,
    "manageUserId" INTEGER,
    "message" TEXT NOT NULL,
    "saveType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "MessageStorage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IpRecord" (
    "id" SERIAL NOT NULL,
    "ipRecord" TEXT NOT NULL,
    "allowed" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "IpRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionsGranted" (
    "id" SERIAL NOT NULL,
    "permissionName" TEXT NOT NULL,
    "topic" TEXT,
    "smsPermitted" TEXT,
    "readOnly" TEXT,
    "allPermitted" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "PermissionsGranted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardForWorkRequest" (
    "id" SERIAL NOT NULL,
    "requestedTeam" TEXT NOT NULL,
    "progressStatus" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "filePath" TEXT[],
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "BoardForWorkRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" SERIAL NOT NULL,
    "keyName" TEXT NOT NULL,
    "keyValue" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceRecord" (
    "id" SERIAL NOT NULL,
    "clockIn" TIMESTAMP(3) NOT NULL,
    "clockOut" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "manageUserId" INTEGER NOT NULL,
    "branchId" INTEGER,

    CONSTRAINT "AttendanceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FollowRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_HashtagToPhoto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RoomToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ManageUserToPermissionsGranted" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AdviceTypeToStudentState" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LecturesToManageUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag_hashtag_key" ON "Hashtag"("hashtag");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_photoId_key" ON "Like"("userId", "photoId");

-- CreateIndex
CREATE UNIQUE INDEX "ManageUser_mUserId_key" ON "ManageUser"("mUserId");

-- CreateIndex
CREATE UNIQUE INDEX "ManageUser_mPhoneNum_key" ON "ManageUser"("mPhoneNum");

-- CreateIndex
CREATE UNIQUE INDEX "Lectures_subjectId_key" ON "Lectures"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "PermissionsGranted_permissionName_key" ON "PermissionsGranted"("permissionName");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_keyValue_key" ON "ApiKey"("keyValue");

-- CreateIndex
CREATE UNIQUE INDEX "_FollowRelation_AB_unique" ON "_FollowRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowRelation_B_index" ON "_FollowRelation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HashtagToPhoto_AB_unique" ON "_HashtagToPhoto"("A", "B");

-- CreateIndex
CREATE INDEX "_HashtagToPhoto_B_index" ON "_HashtagToPhoto"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToUser_AB_unique" ON "_RoomToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToUser_B_index" ON "_RoomToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ManageUserToPermissionsGranted_AB_unique" ON "_ManageUserToPermissionsGranted"("A", "B");

-- CreateIndex
CREATE INDEX "_ManageUserToPermissionsGranted_B_index" ON "_ManageUserToPermissionsGranted"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AdviceTypeToStudentState_AB_unique" ON "_AdviceTypeToStudentState"("A", "B");

-- CreateIndex
CREATE INDEX "_AdviceTypeToStudentState_B_index" ON "_AdviceTypeToStudentState"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LecturesToManageUser_AB_unique" ON "_LecturesToManageUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LecturesToManageUser_B_index" ON "_LecturesToManageUser"("B");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManageUser" ADD CONSTRAINT "ManageUser_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentState" ADD CONSTRAINT "StudentState_currentManagerId_fkey" FOREIGN KEY ("currentManagerId") REFERENCES "ManageUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentState" ADD CONSTRAINT "StudentState_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdviceType" ADD CONSTRAINT "AdviceType_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationMemo" ADD CONSTRAINT "ConsultationMemo_studentStateId_fkey" FOREIGN KEY ("studentStateId") REFERENCES "StudentState"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationMemo" ADD CONSTRAINT "ConsultationMemo_manageUserId_fkey" FOREIGN KEY ("manageUserId") REFERENCES "ManageUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationMemo" ADD CONSTRAINT "ConsultationMemo_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivityLogs" ADD CONSTRAINT "UserActivityLogs_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_managerUserId_fkey" FOREIGN KEY ("managerUserId") REFERENCES "ManageUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPayment" ADD CONSTRAINT "StudentPayment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPayment" ADD CONSTRAINT "StudentPayment_processingManagerId_fkey" FOREIGN KEY ("processingManagerId") REFERENCES "ManageUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPayment" ADD CONSTRAINT "StudentPayment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPayment" ADD CONSTRAINT "StudentPayment_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentStatus" ADD CONSTRAINT "EmploymentStatus_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentStatus" ADD CONSTRAINT "EmploymentStatus_studentPaymentId_fkey" FOREIGN KEY ("studentPaymentId") REFERENCES "StudentPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentStatus" ADD CONSTRAINT "EmploymentStatus_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EduInfomation" ADD CONSTRAINT "EduInfomation_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EduInfomation" ADD CONSTRAINT "EduInfomation_studentPaymentId_fkey" FOREIGN KEY ("studentPaymentId") REFERENCES "StudentPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EduInfomation" ADD CONSTRAINT "EduInfomation_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_studentPaymentId_fkey" FOREIGN KEY ("studentPaymentId") REFERENCES "StudentPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_studentPaymentId_fkey" FOREIGN KEY ("studentPaymentId") REFERENCES "StudentPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentConsultation" ADD CONSTRAINT "StudentConsultation_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentConsultation" ADD CONSTRAINT "StudentConsultation_studentPaymentId_fkey" FOREIGN KEY ("studentPaymentId") REFERENCES "StudentPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentConsultation" ADD CONSTRAINT "StudentConsultation_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HopeForEmployment" ADD CONSTRAINT "HopeForEmployment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HopeForEmployment" ADD CONSTRAINT "HopeForEmployment_studentPaymentId_fkey" FOREIGN KEY ("studentPaymentId") REFERENCES "StudentPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HopeForEmployment" ADD CONSTRAINT "HopeForEmployment_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentRecommendation" ADD CONSTRAINT "EmploymentRecommendation_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentRecommendation" ADD CONSTRAINT "EmploymentRecommendation_studentPaymentId_fkey" FOREIGN KEY ("studentPaymentId") REFERENCES "StudentPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentRecommendation" ADD CONSTRAINT "EmploymentRecommendation_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreInspection" ADD CONSTRAINT "PreInspection_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreInspection" ADD CONSTRAINT "PreInspection_studentPaymentId_fkey" FOREIGN KEY ("studentPaymentId") REFERENCES "StudentPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreInspection" ADD CONSTRAINT "PreInspection_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegularEvaluationSet" ADD CONSTRAINT "RegularEvaluationSet_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegularEvaluationSet" ADD CONSTRAINT "RegularEvaluationSet_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPortfolio" ADD CONSTRAINT "StudentPortfolio_studentPaymentId_fkey" FOREIGN KEY ("studentPaymentId") REFERENCES "StudentPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPortfolio" ADD CONSTRAINT "StudentPortfolio_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPortfolio" ADD CONSTRAINT "StudentPortfolio_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentDetail" ADD CONSTRAINT "PaymentDetail_studentPaymentId_fkey" FOREIGN KEY ("studentPaymentId") REFERENCES "StudentPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentDetail" ADD CONSTRAINT "PaymentDetail_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "ManageUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentDetail" ADD CONSTRAINT "PaymentDetail_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMemo" ADD CONSTRAINT "StudentMemo_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMemo" ADD CONSTRAINT "StudentMemo_manageUserId_fkey" FOREIGN KEY ("manageUserId") REFERENCES "ManageUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMemo" ADD CONSTRAINT "StudentMemo_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lectures" ADD CONSTRAINT "Lectures_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lectures" ADD CONSTRAINT "Lectures_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentPaymentId_fkey" FOREIGN KEY ("studentPaymentId") REFERENCES "StudentPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_lecturesId_fkey" FOREIGN KEY ("lecturesId") REFERENCES "Lectures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkLogs" ADD CONSTRAINT "WorkLogs_lecturesId_fkey" FOREIGN KEY ("lecturesId") REFERENCES "Lectures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkLogs" ADD CONSTRAINT "WorkLogs_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stamp" ADD CONSTRAINT "Stamp_manageUserId_fkey" FOREIGN KEY ("manageUserId") REFERENCES "ManageUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stamp" ADD CONSTRAINT "Stamp_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkRequest" ADD CONSTRAINT "WorkRequest_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alarm" ADD CONSTRAINT "Alarm_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sms" ADD CONSTRAINT "Sms_manageUserId_fkey" FOREIGN KEY ("manageUserId") REFERENCES "ManageUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sms" ADD CONSTRAINT "Sms_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageStorage" ADD CONSTRAINT "MessageStorage_manageUserId_fkey" FOREIGN KEY ("manageUserId") REFERENCES "ManageUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageStorage" ADD CONSTRAINT "MessageStorage_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IpRecord" ADD CONSTRAINT "IpRecord_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsGranted" ADD CONSTRAINT "PermissionsGranted_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardForWorkRequest" ADD CONSTRAINT "BoardForWorkRequest_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "ManageUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardForWorkRequest" ADD CONSTRAINT "BoardForWorkRequest_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_manageUserId_fkey" FOREIGN KEY ("manageUserId") REFERENCES "ManageUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowRelation" ADD CONSTRAINT "_FollowRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowRelation" ADD CONSTRAINT "_FollowRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToPhoto" ADD CONSTRAINT "_HashtagToPhoto_A_fkey" FOREIGN KEY ("A") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToPhoto" ADD CONSTRAINT "_HashtagToPhoto_B_fkey" FOREIGN KEY ("B") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToUser" ADD CONSTRAINT "_RoomToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToUser" ADD CONSTRAINT "_RoomToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManageUserToPermissionsGranted" ADD CONSTRAINT "_ManageUserToPermissionsGranted_A_fkey" FOREIGN KEY ("A") REFERENCES "ManageUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManageUserToPermissionsGranted" ADD CONSTRAINT "_ManageUserToPermissionsGranted_B_fkey" FOREIGN KEY ("B") REFERENCES "PermissionsGranted"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdviceTypeToStudentState" ADD CONSTRAINT "_AdviceTypeToStudentState_A_fkey" FOREIGN KEY ("A") REFERENCES "AdviceType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdviceTypeToStudentState" ADD CONSTRAINT "_AdviceTypeToStudentState_B_fkey" FOREIGN KEY ("B") REFERENCES "StudentState"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LecturesToManageUser" ADD CONSTRAINT "_LecturesToManageUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Lectures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LecturesToManageUser" ADD CONSTRAINT "_LecturesToManageUser_B_fkey" FOREIGN KEY ("B") REFERENCES "ManageUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
