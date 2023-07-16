<?php

namespace App\Controller;

use App\Handler\SecurityHandler;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class SecurityController extends BaseController
{
    private SecurityHandler $handler;

    public function __construct(SecurityHandler $handler, JWTEncoderInterface $JWTEncoder)
    {
        $this->handler = $handler;
        $this->JWTEncoder = $JWTEncoder;
    }

    #[Route('/api/login', methods: ['POST'])]
    public function login(Request $request) {
        return $this->handler->login($request);
    }
}
